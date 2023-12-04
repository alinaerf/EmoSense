import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../App';
import { db } from '../../firebase/config';

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
    <SafeAreaView>
    <View style={{flexDirection:'row', marginVertical:20, marginHorizontal:20}}>
      <Image source={require('./images/profile-pic.jpg')} style={{width:100, height:100, borderRadius:50}}/>
      <View style={{justifyContent:'center'}}>
      <Text style={{fontWeight:700, fontSize:30}}> {userName} </Text>
      {register!=='' && <Text>
        Joined in {register}
        </Text>}
      </View>
    </View>
    <View style={{alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontWeight:700, fontSize:30}} > Mood Statistics</Text>
      <Image source={require('./images/stats.png')} style={{width:300, height:200}}/>
    </View>
    <TouchableOpacity style={{marginVertical:20, marginHorizontal:20, borderWidth:1, borderRadius:8}} onPress={()=> navigation.navigate("Settings")}>
      <Text style={{fontSize:25, marginLeft:10}}>Settings</Text>
    </TouchableOpacity>

    </SafeAreaView>
  );
}