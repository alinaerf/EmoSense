import { TextInput, Text, SafeAreaView } from "react-native"
import React, { useEffect } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useContext, useState } from "react";
import { CurrentUser } from "../../stack/auth-context";
import { app } from '../../firebase/config';
import calculateMLMood from "../../backend/ML_calculation";
import styles from "../../styles/input-styles";
import { useRoute } from "@react-navigation/native";
export default function AddEntryScreen({navigation}){
    const [title, onChangeTitle] = useState('');
    const [description, onChangeDesc] = useState('');
    const { userId, setUserId } = useContext(CurrentUser)
    const route = useRoute();
    const { add, oldDesc, oldTitle, oldId } = route.params;
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
            const date = new Date()
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            const journalRef = app.firebase.firestore().collection('journal').doc(userId).collection('entries');

            if (add) {
                console.log("MOOD IS (Front):", MLmood)
                const postData = {
                    'title': title,
                    'text': description,
                    'MLMood': MLmood,
                    date: date,
                };
                
            
                await journalRef.add(postData);

                console.log('Document added!');
                
            } else {
                const updateData = {
                    'title': title,
                    'text': description,
                    'MLMood': MLmood
                }

                const updatedRef = journalRef.doc(oldId)
                await updatedRef.update(updateData)
                console.log('Document updated!')   
            }
            
            navigation.navigate('JournalList');
        } catch (error) {
            console.error('Error adding document to Firestore:', error);
        }
    }
    useEffect(() => {
        if (!add) {
            console.log(oldDesc)
            console.log(oldTitle)
            console.log(oldId)
            onChangeDesc(oldDesc)
            onChangeTitle(oldTitle)
            console.log(title)
            console.log(description)
        }
    }, [])

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

            <TouchableOpacity onPress={()=> navigation.navigate('JournalList')} style={styles.discardButton}>
                <Text style={styles.btnText}> Discard</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
