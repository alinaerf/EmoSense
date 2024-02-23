import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, Platform } from "react-native"
import { useState } from "react";
import { app } from '../../firebase/config';
import styles from "../../styles/input-styles";
export default function FeedbackScreen({navigation}){
    const [title, onChangeTitle] = useState('');
    const [description, onChangeDesc] = useState('');
    const onAddPress = ()=>{
        if (title.length < 5){
            alert("Feedback title is too short. Minimum length is 5 characters.")
            return
        } else if (description.length < 25){
            alert("Details section is too short. Minimum length is 25 characters.")
            return
        }
        const date= new Date()
        const journalRef=app.firebase.firestore().collection('feedback');
        const postData={
            'title':title,
            'text':description,
            date: date,
            'addressed': false,
        };
        journalRef.add(postData).then(docRef => {
            console.log('Document added with auto-generated ID:', docRef.id);
            navigation.navigate('Settings')
          })
          .catch(error => {
            console.error('Error adding document to Firestore:', error);
          });
    }

    return(
        <SafeAreaView style={stylee.safeArea}> 
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="Feedback Title"
                style={styles.titleInput}

            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Details"
                style={styles.textInput}

            />
            <TouchableOpacity onPress={onAddPress}  style={styles.submitButton}>
                <Text style={styles.btnText}>Send Feedback!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const stylee = StyleSheet.create({
safeArea: {
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  }
})