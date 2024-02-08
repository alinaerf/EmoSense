import { View, TextInput, StyleSheet, Text, SafeAreaView } from "react-native"
import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { CurrentUser } from '../../App';
import { app } from '../../firebase/config';
import calculateMLMood from "../../backend/ML_calculation";
export default function AddEntryScreen({navigation}){
    const [title, onChangeTitle] = useState('');
    const [description, onChangeDesc] = useState('');
    const {userId, setUserId}=useContext(CurrentUser)
    const onAddPress = async()=>{
        if (title.length < 5){
            alert("Title is too short. Minimum length is 5 characters.")
            return
        } else if (description.length < 25){
            alert("Description is too short. Minimum length is 25 characters.")
            return
        }
        
        try {
            const MLmood = await calculateMLMood(description)
            const date= new Date()
            const journalRef = app.firebase.firestore().collection('journal');
            console.log("MOOD IS (Front):", MLmood)
            const postData={
                'user_id':userId,
                'title':title,
                'text': description,
                'MLMood': MLmood,
                date: date,
            };
            
                await journalRef.add(postData);

            console.log('Document added with auto-generated ID:');
            navigation.navigate('JournalList');
        } catch (error) {
            console.error('Error adding document to Firestore:', error);
        }
        
        /*journalRef.add(postData).then(docRef => {
            console.log('Document added with auto-generated ID:', docRef.id);
            navigation.navigate('JournalList')
          })
          .catch(error => {
            console.error('Error adding document to Firestore:', error);
          });*/
    }

    return(
        <SafeAreaView>
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="Title"
                multiline={true}
                textAlign="center"
                textAlignVertical="center"
                style={{margin:10,padding:20, borderWidth:1, borderRadius:10, marginVertical:5, backgroundColor:'white', marginVertical:10, fontSize:35, maxHeight:80}}
            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Description"
                textAlignVertical="center"
                multiline={true}
                style={{margin:10,padding:20, borderWidth:1, borderRadius:10, backgroundColor:'white', marginVertical:10, fontSize:20,maxHeight:500, minHeight:250}}
            />
            <TouchableOpacity onPress={onAddPress}  style={{ backgroundColor:'#7455f6', borderRadius:10, padding:5}}>
                <Text style={{color: 'white', fontSize:15, textAlign:'center'}}>Add!</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
const style=StyleSheet.create({
    input1:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10, 
    }, 
    input2:{
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})