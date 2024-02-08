import { Modal, View, Text, Pressable, StyleSheet } from "react-native"
import Slider from "@react-native-community/slider";
import { useState, useContext } from "react";
import { CurrentUser } from '../../App';
import { app } from '../../firebase/config';
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
        const moodRef = app.firebase.firestore().collection('moods');
        const current= new Date()
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const entryDate = [current.getDay()] + ', ' + monthNames[current.getMonth()] + ', ' + current.getFullYear();
        
        const postData={
            'user_id':userId,
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
            <View style={styles.centeredView}>
                
                <View style={styles.modalView}>
                    
                    <Text style={styles.modalText}>What is your mood today?</Text>

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
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{'\u{1F62A}'}</Text>
                        <Text style={styles.text}>{'\u{1F612}'}</Text>
                        <Text style={styles.text}>{'\u{1F610}'}</Text>
                        <Text style={styles.text}>{'\u{1F642}'}</Text>
                        <Text style={styles.text}>{'\u{1F601}'}</Text>
                    </View>
            <View style={{flexDirection:'row', marginTop:30}}>
                        <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={saveMood}
            >
              <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
            <Pressable
                    style={[styles.button, styles.buttonClose]}
              onPress={() => setNotifVisible(!notifVisible)}>
                <Text style={styles.textStyle}> Close</Text>
            </Pressable>
            </View>        

          </View>
        </View>
      </Modal>
    )
}
const styles = StyleSheet.create({
  searchInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    width: 350,
    },
   textContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchListView: {
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  searchRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  searchContainer: {
    position: "absolute",
    top: '5%',
    padding: 10,
  },
  toppedView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 999,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 999,
  },
  modalTopView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    textAlign: 'center', 
    marginHorizontal:50
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#808080",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

});
