import { Modal, View, Text, Pressable, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { CurrentUser } from '../../App';
import { app } from '../../firebase/config';
import style from "../../styles/notification-styles";
export default function Notification() {
    const [notifVisible, setNotifVisible] = useState(true);
    const [mood, setMood] = useState(3);
    const {userId, setUserId}=useContext(CurrentUser)
    const getColor = () => {
        if (mood === 1) return 'red';
        if (mood === 2) return 'orange';
        if (mood === 3) return 'yellow';
        if (mood === 4) return 'lightgreen';
        if (mood === 5) return 'green';
      };
    const handleSliderChange = (value) => {
        setMood(value);
    };
    const saveMood = () => {
        const moodRef = app.firebase.firestore().collection('moods').doc(userId).collection('moods');
        const current= new Date()
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const entryDate = [current.getDay()] + ', ' + monthNames[current.getMonth()] + ', ' + current.getFullYear();
        
        const postData={
            'mood':mood,
            'date': entryDate,
        };
        moodRef.add(postData).then(docRef => {
            console.log('Document added with auto-generated ID:', docRef.id);
            setNotifVisible(false)
          })
          .catch(error => {
            console.error('Error adding document to Firestore:', error);
          });
    }
    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={notifVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setNotifVisible(!notifVisible);
        }}
        >
            <View style={style.centeredView}>
                
                <View style={style.modalView}>
                    
                    <Text style={style.modalText}>What is your mood today?</Text>

                    <Slider
                        style={{ width: 300, height: 40 }}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        value={mood}
                        onValueChange={handleSliderChange}
                        minimumTrackTintColor={getColor()} // Set color based on mood
                        maximumTrackTintColor='gray'
                    />
                    <View style={style.textContainer}>
                        <Text style={style.text}>{'\u{1F62A}'}</Text>
                        <Text style={style.text}>{'\u{1F612}'}</Text>
                        <Text style={style.text}>{'\u{1F610}'}</Text>
                        <Text style={style.text}>{'\u{1F642}'}</Text>
                        <Text style={style.text}>{'\u{1F601}'}</Text>
                    </View>
            <View style={{flexDirection:'row', marginTop:30}}>
                        <Pressable
              style={[style.button, style.buttonOpen]}
              onPress={saveMood}
            >
              <Text style={style.textStyle}>Save</Text>
                    </Pressable>
            <Pressable
                    style={[style.button, style.buttonClose]}
              onPress={() => setNotifVisible(!notifVisible)}>
                <Text style={style.textStyle}> Close</Text>
            </Pressable>
            </View>        

          </View>
        </View>
      </Modal>
    )
}
