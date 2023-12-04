import { View, TextInput, StyleSheet, Text, SafeAreaView } from "react-native"
import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { CurrentUser } from '../../App';
import { app } from '../../firebase/config';
export default function AddEntryScreen({navigation}){
    const [title, onChangeTitle] = useState('');
    const [description, onChangeDesc] = useState('');
    const {userId, setUserId}=useContext(CurrentUser)
    const onAddPress = ()=>{
        if (title.length < 5){
            alert("Title is too short. Minimum length is 5 characters.")
            return
        } else if (description.length < 25){
            alert("Description is too short. Minimum length is 25 characters.")
            return
        }
        const date= new Date()
        const journalRef=app.firebase.firestore().collection('journal');
        const postData={
            'user_id':userId,
            'title':title,
            'text':description,
            date: date,
        };
        journalRef.add(postData).then(docRef => {
            console.log('Document added with auto-generated ID:', docRef.id);
            navigation.navigate('JournalList')
          })
          .catch(error => {
            console.error('Error adding document to Firestore:', error);
          });
    }

    return(
        <SafeAreaView>
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="Title"
                style={style.input1}
            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Description"
                style={style.input2}
            />
            <TouchableOpacity onPress={onAddPress}  style={{ backgroundColor:'purple'}}>
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