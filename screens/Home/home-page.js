import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ArticleList from '../../components/article-list';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../App';
import { db } from '../../firebase/config';


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
      <View style={{height:200, backgroundColor:'#AD40AF', justifyContent:'center',alignItems: 'center'}}>
      <Text style={{ fontSize: 25, color:'white'}}>Welcome back, {userName}!</Text>
      </View>
      <Text style={{fontSize:20, marginLeft:10, marginVertical:10, fontWeight:700}}>Articles for you</Text>
      <ArticleList/>
</View>
  );
}