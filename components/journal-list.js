import { View, FlatList } from "react-native";
import { CurrentUser } from '../App';
import { db } from '../firebase/config';
import JournalItem from "./journal-item";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
const JournalList =({calendarView})=>{
    const renderItem =({item})=>{
        return <JournalItem title={item.title} description={item.text} date={item.date} MLMood={item.MLMood} dbId={item.id} />
    }
    const {userId, setUserId}=useContext(CurrentUser)
    const [data, setData] = useState([])
    const [dates, setDates] = useState({})
    const [datesInfo, setDatesInfo] = useState({})
    const navigation=useNavigation()
    const fetchData = async ()=>{
        try {
            const response= await db.collection('journal').doc(userId).collection('entries').orderBy('date', 'desc').get()
            const newData = []
            const newDates = {}
            const newDatesInfo={}
            response.forEach(doc =>{
                newData.push({ id: doc.id, ...doc.data(), })
                const date = doc.data().date.toDate().toISOString().split('T')[0]; 
                const mood = doc.data().MLMood;
                let moodColor='blue'  
                if (mood) {
                    moodColor = mood >= 4 ? 'green' : (mood == 3 ? 'orange' : 'red')
                }
                newDates[date] = {
                    marked: true, dotColor: moodColor, selected: true, selectedColor: 'rgba(116, 85, 246, 0.5)'
                };
                newDatesInfo[date] = {
                    text:doc.data().text, title:doc.data().title, date: doc.data().date, MLMood:doc.data().MLMood, id: doc.id
                };
            })
            setData(prevData => [...prevData, ...newData])
            setDates(prevMarkedDates => ({ ...prevMarkedDates, ...newDates })); // Update marked dates state
            setDatesInfo(prevDatesInfo => ({ ...prevDatesInfo, ...newDatesInfo }));

        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }

    useFocusEffect(
        React.useCallback(() => {
            if(!userId){
                alert("No user authenticated!")
                }
          // Fetch data when the screen comes into focus
            setData([])
            //setDates({})
            fetchData();
        }, [])
      );
    return (
        <View >
            {
                !calendarView ?
                <FlatList
                data={data}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            />
                    :
                    <Calendar
                        markedDates={dates}
                        onDayPress={day => {
                            console.log('selected day', day.dateString);
                            console.log(datesInfo[day.dateString])
                            item = datesInfo[day.dateString]
                            title = item['title']
                            description = item['text']
                            dbId=item['id']
                            navigation.navigate('Entry', {title,description, dbId})
                        }}    
                    />
            }
        </View>
    )
}
export default JournalList;