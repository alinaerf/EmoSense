import { Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { useState } from "react";
import { app } from '../../firebase/config';
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
        <SafeAreaView>
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="Feedback Title"
                style={style.input1}
            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Details"
                style={style.input2}
            />
            <TouchableOpacity onPress={onAddPress}  style={{ backgroundColor:'purple'}}>
                <Text style={{color: 'white', fontSize:15, textAlign:'center'}}>Send Feedback!</Text>
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