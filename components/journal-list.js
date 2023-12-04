import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { CurrentUser } from '../App';
import { db } from '../firebase/config';
import JournalItem from "./journal-item";
import { useContext, useEffect, useState } from "react";
const JournalList =({navigation})=>{
    const renderItem =({item})=>{
        return <JournalItem title={item.title} description={item.text}/>
    }
    const {userId, setUserId}=useContext(CurrentUser)
    const [data, setData]=useState([])
    useEffect(()=>{
      if(!userId){
        alert("No user authenticated!")
      }
      //console.log("useEFFECT triggered?")
      const fetchData = async ()=>{
        try {
            const response= await db.collection('journal').where("user_id", '==', userId).get()
            const newData=[]
            response.forEach(doc =>{
                console.log(doc.data())
                newData.push(doc.data())
            })
            setData(prevData=>[...prevData, ...newData])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, [])
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
                onRefresh={() => console.log('Refreshing...')}
                refreshing={false} // Set this to the loading state if applicable
            />
        </View>
    )
}
export default JournalList;