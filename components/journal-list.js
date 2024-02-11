import { View, FlatList } from "react-native";
import { CurrentUser } from '../App';
import { db } from '../firebase/config';
import JournalItem from "./journal-item";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from "react-native-calendars";
const JournalList =({navigation, calendarView})=>{
    const renderItem =({item})=>{
        return <JournalItem title={item.title} description={item.text} date={item.date} MLMood={item.MLMood}/>
    }
    const {userId, setUserId}=useContext(CurrentUser)
    const [data, setData] = useState([])
    const [dates, setDates] = useState({})
    const fetchData = async ()=>{
        try {
            const response= await db.collection('journal').where("user_id", '==', userId).orderBy('date', 'desc').get()
            const newData = []
            const newDates={}
            response.forEach(doc =>{
                newData.push({ id: doc.id, ...doc.data(), })
                const date = doc.data().date.toDate(); 
                const mood = doc.data().MLMood;
                let moodColor='blue'  
                if (mood) {
                    moodColor = mood >= 4 ? 'green' : (mood == 3 ? 'orange' : 'red')
                }
                newDates[date.toISOString().split('T')[0]] = {
                    marked: true, dotColor: moodColor,  selected: true, selectedColor: 'rgba(116, 85, 246, 0.5)'};
            })
            setData(prevData => [...prevData, ...newData])
            setDates(prevMarkedDates => ({ ...prevMarkedDates, ...newDates })); // Update marked dates state

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
            console.log(dates)
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
                            console.log('selected day', day);
                        }}    
                    />
            }
        </View>
    )
}
export default JournalList;