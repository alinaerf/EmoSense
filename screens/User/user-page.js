import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../App';
import { db } from '../../firebase/config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function UserScreen({navigation}) {
  const {userId, setUserId}=useContext(CurrentUser)
  const [userName, setUserName]=useState('');
  const [register, setRegister]=useState('');
  useEffect(()=>{
    if(!userId){
      alert("No user authenticated!")
    }
    db.collection('users')
    .where("id", '==', userId)
    .get()
    .then((response)=>{
      response.docs[0].data().name?setUserName(response.docs[0].data().name):null;
      response.docs[0].data().register?setRegister(response.docs[0].data().register):null;
    })
  })
  return (
    <View>
          <View style={{height:170, backgroundColor:'white', justifyContent:'center',alignItems: 'center', borderRadius:20, paddingTop:20}}>
    <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
        <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}><Fontisto name='bell' size={30} color={'black'}/></TouchableOpacity>
        <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}} onPress={()=> navigation.navigate("Settings")} >< MaterialCommunityIcons name='dots-grid' size={30} color={'black'}/></TouchableOpacity>
    </View>
      <Text  style={{ fontSize: 35, color:'black', justifyContent:'center', marginBottom:15}}> Me</Text>
    </View>
    <View style={{flexDirection:'row', marginVertical:20, marginHorizontal:20}}>
      <Image source={require('./images/profile-pic.jpg')} style={{width:100, height:100, borderRadius:50}}/>
      <View style={{justifyContent:'center', marginLeft:10}}>
      <Text style={{fontWeight:700, fontSize:30}}> {userName} </Text>
      {register!=='' && <Text style={{marginLeft:5}}>
        Joined in {register}
        </Text>}
      </View>
    </View>
    <View style={{ backgroundColor:'white', borderRadius:20 }}>
      <Text style={{fontWeight:500, fontSize:30, marginVertical:15, marginLeft:15}} > Mood Statistics</Text>
      <Image source={require('./images/stats.png')} style={{width:300, height:200, marginLeft:15, marginBottom:20}}/>
    </View>
    </View>
  );
}