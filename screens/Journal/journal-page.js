import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import JournalList from '../../components/journal-list';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState, useMemo } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function JournalScreen({navigation}) {
  const current= new Date()
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
  const todayDate=current.getDate() +' '+monthNames[current.getMonth()] + ', '+ current.getFullYear();
  return (
    <View style={{flex:1}}>
    <View style={{height:250, backgroundColor:'white', justifyContent:'center',alignItems: 'center', borderRadius:20, paddingTop:30}}>
    <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
        <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}><Fontisto name='bell' size={30} color={'black'}/></TouchableOpacity>
        <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}>< MaterialCommunityIcons name='dots-grid' size={30} color={'black'}/></TouchableOpacity>
    </View>
    <Text style={{ fontSize: 20, color:'#a8a8ae', justifyContent:'center', marginTop:10}}>{todayDate}</Text>
      <Text  style={{ fontSize: 35, color:'black', justifyContent:'center'}}> Journal</Text>

    <View style={{borderColor:'#a8a8ae', borderWidth:1, borderRadius:10, flexDirection:'row',  alignItems: 'center',justifyContent: 'center',paddingHorizontal: 10, marginTop:20, marginHorizontal:20, padding:5}}>
      <TouchableOpacity  style={{flex:1, flexDirection:'row', padding:12, borderRadius:10, backgroundColor:'#7455f6', alignItems:'center', justifyContent:'center'}}>
        <MaterialCommunityIcons name='book-outline' size={20} color={'white'}/>
        <Text style={{fontSize:18, color:'white', marginLeft:3}}>Journal View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flex:0, flexDirection:'row', padding:10, alignItems:'center', justifyContent:'center'}}>
          <Ionicons name='calendar-outline' size={20}/>
         <Text style={{fontSize:18, marginLeft:3}}>Month View</Text> 
      </TouchableOpacity>
    </View>
    </View>
    <View style={{flex:3}}>
    <JournalList/>
    </View>
    <TouchableOpacity style={{ backgroundColor:'#7455f6',maxHeight:50, justifyContent:'center', borderRadius:10,flex:1 }} onPress={()=>navigation.navigate("Add")}>
        <Text style={{color: 'white', fontSize:15, textAlign:'center'}}>Add a new entry</Text>
    </TouchableOpacity>
    
</View>
  );
}