import { TextInput, Text, SafeAreaView } from "react-native"
import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { CurrentUser } from '../../App';
import { app } from '../../firebase/config';
import calculateMLMood from "../../backend/ML_calculation";
import styles from "../../styles/input-styles";
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
                style={styles.titleInput}
            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Description"
                textAlignVertical="center"
                multiline={true}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={onAddPress}  style={styles.submitButton}>
                <Text style={styles.btnText}>Add!</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
