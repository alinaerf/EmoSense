import { Text, View, Image, TouchableOpacity } from 'react-native';
import React,{ useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../stack/auth-context';
import { db } from '../../firebase/config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinePlot from '../../components/plot';
import { useFocusEffect } from '@react-navigation/native';


export default function UserScreen({navigation}) {
  const {userId, setUserId}=useContext(CurrentUser)
  const [userName, setUserName]=useState('');
  const [register, setRegister] = useState('');
  const [moodMonth, setMoodMonth] = useState([]);
  const [mlMood, setMlMood] = useState([]);

  const changeToFS = (date) => {
    const changed = date;
    changed.setHours(0);
    changed.setSeconds(0);
    changed.setMilliseconds(0);
    return changed
  }
  const fetchData = async ()=>{
    try {
          if(!userId){
            alert("No user authenticated!")
          }
          const userResp= await db.collection('users').where("id", '==', userId).get()
          setUserName(userResp.docs[0].data().name)
          setRegister(userResp.docs[0].data().register)
          
          const today = new Date()
          const month = new Date()
          month.setMonth(today.getMonth()-1)
          const monthAgo=changeToFS(month)
          
          const moodsResp=await db.collection('moods')
            .doc(userId).collection('moods')
            .where('date', '>=', monthAgo)
            .get()
          const data=moodsResp.docs.map(doc => ({
            id: doc.id,
            date: doc.data().date.toDate().toISOString(), 
            mood: doc.data().mood
          }))
          setMoodMonth(data)
          const journalResp=await db.collection('journal')
            .doc(userId)
            .collection('entries')
            .where('date', '>=', monthAgo)
            .get()
          const MLData = journalResp.docs
            .filter(doc => doc.data().hasOwnProperty('MLMood')) // Filter out documents without mlMood field
              .map(doc => ({
                id: doc.id,
                date: doc.data().date.toDate().toISOString(),
                mood: doc.data().MLMood
              }));
        console.log(MLData)
        setMlMood(MLData); 
          
           
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
    useFocusEffect(
        React.useCallback(() => {
          // Fetch data when the screen comes into focus
            fetchData();
        }, [])
      );

  return (
    <View>
          <View style={{height:170, backgroundColor:'white', justifyContent:'center',alignItems: 'center', borderRadius:20, paddingTop:20}}>
    <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
        <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}></TouchableOpacity>
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
        <LinePlot data={moodMonth} mlData={mlMood} />
    </View>
    </View>
  );
}