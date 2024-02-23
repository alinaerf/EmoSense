import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import JournalList from '../../components/journal-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from 'react';
import { CurrentUser } from '../../stack/auth-context';
import { db } from '../../firebase/config';
import style from '../../styles/notification-styles';
import { Timestamp } from 'firebase/firestore';


export default function JournalScreen({ navigation }) {
  const [calendarView, setCalendarView] = useState(false);
  const current= new Date()
  const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
  const todayDate = current.getDate() + ' ' + monthNames[current.getMonth()] + ', ' + current.getFullYear();
  const {userId, setUserId}=useContext(CurrentUser)
  const [userName, setUserName] = useState('');
  const [newEntry, setNewEntry] = useState(false);
  const [notifVisible, setNotifVisible] = useState(false);
  const [oldDesc, setOldDesc] = useState('');
  const [oldTitle, setOldTitle] = useState('');
  const [oldId, setOldId] = useState('');
  

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
    //console.log(entryDate)
    const fsDate = Timestamp.fromDate(entryDate)
    //console.log(fsDate)
    db.collection('journal')
      .doc(userId)
      .collection('entries')
      .where('date', '==', fsDate)
      .get()
      .then((response) => {
        if (response.empty) {
          setNewEntry(true)
        } else {
          const oldData= response.docs[0].data()
          setOldDesc(oldData.text);
          setOldTitle(oldData.title);
          setOldId(response.docs[0].id)
          setNewEntry(false)
        }
    })   
  })
  const handleNewEntry = () => {
    if (newEntry) {
      navigation.navigate("Add", {add: true})
    } else {
      setNotifVisible(true)
    }
  }
  return (
    <View style={{flex:1}}>
    <View style={{height:250, backgroundColor:'white', justifyContent:'center',alignItems: 'center', borderRadius:20, paddingTop:30}}>
    <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
        <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}></TouchableOpacity>
        <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}>< MaterialCommunityIcons name='dots-grid' size={30} color={'black'}/></TouchableOpacity>
    </View>
    <Text style={{ fontSize: 20, color:'#a8a8ae', justifyContent:'center', marginTop:10}}>{todayDate}</Text>
      <Text  style={{ fontSize: 35, color:'black', justifyContent:'center'}}> Journal</Text>

    <View style={{borderColor:'#a8a8ae', borderWidth:1, borderRadius:10, flexDirection:'row',  alignItems: 'center',justifyContent: 'center',paddingHorizontal: 10, marginTop:20, marginHorizontal:20, padding:5}}>
      <TouchableOpacity  style={[styles.journalBtn, !calendarView?styles.activeBtn:null]} onPress={()=>setCalendarView(false)}>
        <MaterialCommunityIcons name='book-outline' size={20} color={!calendarView?'white':'black'}/>
        <Text style={[styles.btnText, !calendarView?styles.activeTxt:null]}>Journal View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.calendarBtn, calendarView?styles.activeBtn:null]} onPress={()=>setCalendarView(true)}>
          <Ionicons name='calendar-outline' size={20} color={calendarView?'white':'black'}/>
         <Text style={[styles.btnText, calendarView?styles.activeTxt:null]}>Month View</Text> 
      </TouchableOpacity>
    </View>
      </View>
      <Modal
            animationType="slide"
            transparent={true}
            visible={notifVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setNotifVisible(!notifVisible);
        }}  
        >
            <View style={style.centeredView}>
                
                <View style={style.modalView}>
                    
                    <Text style={style.modalText}>You have already written an entry for today. Would you like to edit it?</Text>
            <View style={{flexDirection:'row', marginTop:30}}>
                        <Pressable
              style={[style.button, style.buttonOpen]}
                onPress={() => {
                  setNotifVisible(false)
                  navigation.navigate("Add", {
                    add: false,
                    oldDesc: oldDesc,
                    oldTitle: oldTitle,
                    oldId: oldId
                  }
                    
                  )
              } }
            >
              <Text style={style.textStyle}>Yes</Text>
                    </Pressable>
            <Pressable
                    style={[style.button, style.buttonClose]}
              onPress={() => setNotifVisible(false)}>
                <Text style={style.textStyle}> No</Text>
            </Pressable>
            </View>        

          </View>
        </View>
      </Modal>
    
      {!calendarView ?
        <View style={{ flex: 3 }}>
          <JournalList calendarView={calendarView}/>
        </View> :
        <JournalList calendarView={calendarView}/>      
        }
    <TouchableOpacity style={styles.addBtn} onPress={handleNewEntry}>
        <Text style={styles.addBtnText}>Add a new entry</Text>
    </TouchableOpacity>
    
</View>
  );
}
const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#7455f6',
    maxHeight: 50,
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1
  },
  addBtnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  activeBtn: {
    borderRadius: 10,
    backgroundColor: '#7455f6'
  },
  activeTxt: {
    color:'white'
  },
  btnText: {
    fontSize: 18,
    marginLeft: 3
  },
  journalBtn: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  calendarBtn: {
    flex: 0,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center'
  }
})