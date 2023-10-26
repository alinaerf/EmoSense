import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/input-field';

export default function LoginScreen({navigation}){
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
            <InputField label={'Email address'} icon={<MaterialIcons name='alternate-email' size={20} color='#666'style={{marginRight:5}}/>} keyboardType={'email-address'}/>
            <InputField label={'Password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'} fieldButtonLabel={'Forgot?'}/>
            <TouchableOpacity style={{backgroundColor:'#AD40AF', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}>Login</Text>
            </TouchableOpacity>
            
            <Text style={{textAlign:"center", color:'#666', marginBottom:30}}> Or, login with ...</Text>
            
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
                <TouchableOpacity onPress={()=>{}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10,paddingHorizontal:30, paddingVertical:10 }}>
                <Image source={require('../assets/google.png')} height={24} width={24}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10,paddingHorizontal:30, paddingVertical:10 }}>
                <Image source={require('../assets/facebook.png')} height={24} width={24}/>
                </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
            <Text> New to the app?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                <Text style={{color:'#AD40AF', fontWeight:700}}>Register</Text>
            </TouchableOpacity>

            </View>
            
            </View>
            
        </SafeAreaView>
    )
}