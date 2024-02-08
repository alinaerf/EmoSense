import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Platform, Pressable, Switch} from 'react-native';
import { useState, useContext } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/input-field';
import DateTimePicker from '@react-native-community/datetimepicker';
import { app } from '../../firebase/config';
import { CurrentUser } from '../../App';
export default function RegistrationScreen({navigation}){
    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const [date, setDate]=useState(new Date());
    const [showPicker, setShowPicker]=useState(false);
    const [dateOfBirth,setDateOfBirth]=useState("");
    const [MLopt, setMLOpt]=useState(false)
    const {userId, setUserId}=useContext(CurrentUser)
    const toggleOpt = ()=>{
        setMLOpt(!MLopt)
    }
    const toggleDatePicker = ()=>{
        setShowPicker(!showPicker)
    }
    const onChange =({type}, selectedDate)=>{
        if (type=="set"){
            const currentDate=selectedDate;
            setDate(currentDate);
            if (Platform.OS==='android'){
                setDateOfBirth(currentDate.toDateString());
                toggleDatePicker();
            }
        } else {
            toggleDatePicker();
        }
    }

    const onRegisterPress = ()=>{
        if (password!== confirmPassword){
            alert("Passwords don't match!")
            return
        }
        app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const current= new Date()
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];
            
            const registerDate=monthNames[current.getMonth()] + ', '+ current.getFullYear();
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                name,
                date:date,
                register:registerDate,
                'MLopt': MLopt,
            };
            const usersRef = app.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    setUserId(uid)
                    navigation.navigate("Main", {screen: 'Home', params:{
                        screen:'Articles'
                    }})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
    }
    const confirmIOSDate =()=>{
        setDateOfBirth(date.toDateString());
        toggleDatePicker();
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
                Register
            </Text>
            <InputField label={'Email address'} icon={<MaterialIcons name='alternate-email' size={20} color='#666'style={{marginRight:5}}/>} keyboardType={'email-address'} onChangeFunc={(text)=>setEmail(text)} value={email}/>
            <InputField label ={'Full name'} icon={<Ionicons name='person-outline' size={20} color='#666' style={{marginRight:5}}/>} value={name} onChangeFunc={(text)=>setName(text)}/>
            <View>
                {showPicker &&(
                    <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                />
                )}
                {showPicker && Platform.OS==='ios' && (
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={confirmIOSDate}  style={{backgroundColor:'#7455f6', padding:20, borderRadius:10, marginBottom:30}}>
                            <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}> Confirm </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleDatePicker} style={{backgroundColor:'#FFF', padding:20, borderRadius:10, marginBottom:30}}>
                            <Text style={{textAlign:'center', fontWeight:700}}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!showPicker && (
                    <Pressable onPress={toggleDatePicker}>
                        <View style={{flexDirection:'row', borderBottomColor:'#CCC', borderBottomWidth:1, paddingBottom:8, marginBottom:25}}>
                        <Ionicons name="calendar-outline" size={20} color='#666' style={{marginRight:5}}/>
                        <TextInput
                            placeholder='Date of Birth'
                            value={dateOfBirth}
                            editable={false}
                            onPressIn={toggleDatePicker}
                            style={{flex:1, paddingVertical:0}}
                        /> 
                        </View>
                </Pressable>    
                )}          
            </View>
            <InputField label={'Password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} value={password} onChangeFunc={(text)=>setPassword(text)}/>
            <InputField label={'Confirm password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} value={confirmPassword} onChangeFunc={(text)=>setConfirmPassword(text)}/>
            
            <View style={{flexDirection:'row', paddingBottom:8, marginBottom:25}}>
                <Text style={{flex:1, paddingVertical:0, }}> Opt in for ML features?</Text>
            <Switch
                trackColor={{false: '#767577', true: '#7455f6'}}
                thumbColor={MLopt ? '#813082' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleOpt}
                value={MLopt}
            />
            </View>

            <TouchableOpacity style={{backgroundColor:'#7455f6', padding:20, borderRadius:10, marginBottom:30}} onPress={onRegisterPress}>
                <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}>Create account</Text>
            </TouchableOpacity>

            
            
            </View>
            
        </SafeAreaView>
    )
}