import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Platform, Pressable} from 'react-native';
import { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../components/input-field';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function RegistrationScreen({navigation}){
    const [date, setDate]=useState(new Date());
    const [showPicker, setShowPicker]=useState(false);
    const [dateOfBirth,setDateOfBirth]=useState("");
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
            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
                <TouchableOpacity onPress={()=>{}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10,paddingHorizontal:30, paddingVertical:10 }}>
                <Image source={require('../assets/google.png')} height={24} width={24}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}} style={{borderColor:'#ddd', borderWidth:2, borderRadius:10,paddingHorizontal:30, paddingVertical:10 }}>
                <Image source={require('../assets/facebook.png')} height={24} width={24}/>
                </TouchableOpacity>
            </View> 
            <Text style={{textAlign:"center", color:'#666', marginBottom:30}}> Or, register with email ... </Text>           
            <InputField label={'Email address'} icon={<MaterialIcons name='alternate-email' size={20} color='#666'style={{marginRight:5}}/>} keyboardType={'email-address'}/>
            <InputField label ={'Full name'} icon={<Ionicons name='person-outline' size={20} color='#666' style={{marginRight:5}}/>}/>
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
                        <TouchableOpacity onPress={confirmIOSDate}  style={{backgroundColor:'#AD40AF', padding:20, borderRadius:10, marginBottom:30}}>
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
            <InputField label={'Password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'}/>
            <InputField label={'Confirm password'} icon={<Ionicons name='ios-lock-closed-outline' size={20} color='#666'style={{marginRight:5}}/>} inputType={'password'}/>

            <TouchableOpacity style={{backgroundColor:'#AD40AF', padding:20, borderRadius:10, marginBottom:30}}>
                <Text style={{textAlign:'center', fontWeight:700, color:'#FFF'}}>Register</Text>
            </TouchableOpacity>
            
            </View>
            
        </SafeAreaView>
    )
}