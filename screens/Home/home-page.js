import { Text, View, TouchableOpacity, Image } from 'react-native';
import ArticleList from '../../components/article-list';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../stack/auth-context';
import { db } from '../../firebase/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Notification from '../Notification/notification';
import { Timestamp } from 'firebase/firestore';

export default function HomeScreen({navigation}) {
  const {userId, setUserId}=useContext(CurrentUser)
  const [userName, setUserName] = useState('');
  const [newDay, setNewDay] = useState(false);

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
    const entryDate= new Date()
    entryDate.setHours(0);
    entryDate.setMinutes(0);
    entryDate.setSeconds(0);
    entryDate.setMilliseconds(0);
    const fsDate = Timestamp.fromDate(entryDate)

    db.collection('moods')
      .doc(userId)
      .collection('moods')
      .where('date', '==', fsDate)
      .get()
      .then((response) => {
        if (response.empty) {
          setNewDay(true)
        } else {
          setNewDay(false)
        }
    })   
  })
  return (
    <View style={{flex:1}}>
      <View style={{height:250, backgroundColor:'#7455f6', justifyContent:'center',alignItems: 'center', borderRadius:20}}>
        <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
         <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}></TouchableOpacity>
        <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}}>< MaterialCommunityIcons name='dots-grid' size={30} color={'white'} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}/></TouchableOpacity>
        </View>
      <View style={{alignItems:'center'}}>
      <Image source={require('./images/profile-pic.jpg')} style={{width:50, height:50, borderRadius:10, alignSelf:'center'}}/>
      <Text style={{ fontSize: 25, color:'#af9ff7', justifyContent:'center', marginTop:10}}>Welcome back,</Text>
      <Text  style={{ fontSize: 25, color:'white', justifyContent:'center'}}> {userName}</Text>
      </View>
      </View>
      <Text style={{ fontSize: 20, marginLeft: 10, marginVertical: 10, fontWeight: 700 }}>Articles for you</Text>
      {newDay?<Notification/>:null}
      <ArticleList/>
</View>
  );
}


