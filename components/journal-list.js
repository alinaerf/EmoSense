import { View, FlatList } from "react-native";
import { CurrentUser } from '../App';
import { db } from '../firebase/config';
import JournalItem from "./journal-item";
import React, { useContext, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
const JournalList =({navigation})=>{
    const renderItem =({item})=>{
        return <JournalItem title={item.title} description={item.text} date={item.date} MLMood={item.MLMood}/>
    }
    const {userId, setUserId}=useContext(CurrentUser)
    const [data, setData]=useState([])
    const fetchData = async ()=>{
        try {
            const response= await db.collection('journal').where("user_id", '==', userId).get()
            const newData=[]
            response.forEach(doc =>{
                newData.push({id: doc.id, ...doc.data(),})
            })
            setData(prevData=>[...prevData, ...newData])
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
            fetchData();
        }, [])
      );
    return (
        <View >
            <FlatList
                data={data}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default JournalList;