import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/input-field';
import { useState } from 'react';
import { app } from '../../firebase/config';
import { useContext } from 'react';
import { CurrentUser } from '../../stack/auth-context';
export default function LoginScreen({ navigation }) {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const {userId, setUserId}=useContext(CurrentUser)
    const onPressLogin=()=>{
        app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = app.firestore().collection('users')
            usersRef
                .doc(uid)
                .get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        alert("User does not exist anymore.")
                        return;
                    }
                    const user = firestoreDocument.data()
                    setUserId(uid)
                    navigation.navigate("Main", {screen: 'Home', params:{
                        screen:'Articles'
                    }})
                })
                .catch(error => {
                    alert(error)
                });
        })
        .catch(error => {
            alert(error)
        })       
    }
    return(
        <SafeAreaView style={{flex:1, justifyContent:'center'}}>
            <View style={{paddingHorizontal:25}}>
            <Text 
                style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:30
                }}>
                Login
            </Text>
            <InputField label={'Email address'} icon={<MaterialIcons name='alternate-email' size={20} color='#666'style={{marginRight:5}}/>} keyboardType={'email-address'} value={email} onChangeFunc={(text)=>setEmail(text)}/>
            <InputField label={'Password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} fieldButtonLabel={'Forgot?'} value={password} onChangeFunc={(text)=>setPassword(text)}/>
            <TouchableOpacity style={{backgroundColor:'#7455f6', padding:20, borderRadius:10, marginBottom:30}} onPress={onPressLogin}>
                <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}>Login</Text>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
            <Text> New to the app?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                <Text style={{color:'#7455f6', fontWeight:700}}>Register</Text>
            </TouchableOpacity>

            </View>
            
            </View>
            
        </SafeAreaView>
    )
}