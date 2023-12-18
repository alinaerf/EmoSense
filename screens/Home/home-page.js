import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import ArticleList from '../../components/article-list';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../App';
import { db } from '../../firebase/config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function HomeScreen({navigation}) {
  const {userId, setUserId}=useContext(CurrentUser)
  const [userName, setUserName]=useState('');
  useEffect(()=>{
    if(!userId){
      alert("No user authenticated!")
    }
    db.collection('users')
    .where("id", '==', userId)
    .get()
    .then((response)=>{
      response.docs[0].data().name?setUserName(response.docs[0].data().name):null;
    })
  })
  return (
    <View>
      <View style={{height:250, backgroundColor:'#7455f6', justifyContent:'center',alignItems: 'center', borderRadius:20}}>
        <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
        <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}><Fontisto name='bell' size={30} color={'white'}/></TouchableOpacity>
        <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}}>< MaterialCommunityIcons name='dots-grid' size={30} color={'white'} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}/></TouchableOpacity>
        </View>
      <View>
      <Image source={require('./images/profile-pic.jpg')} style={{width:50, height:50, borderRadius:10, alignSelf:'center'}}/>
      <Text style={{ fontSize: 25, color:'#af9ff7', justifyContent:'center', marginTop:10}}>Welcome back,</Text>
      <Text  style={{ fontSize: 25, color:'white', justifyContent:'center'}}> {userName}</Text>
      </View>
      </View>
      <Text style={{fontSize:20, marginLeft:10, marginVertical:10, fontWeight:700}}>Articles for you</Text>
      <ArticleList/>
</View>
  );
}


