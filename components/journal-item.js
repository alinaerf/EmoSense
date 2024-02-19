import { useNavigation } from "@react-navigation/core";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../styles/journal-styles";

const JournalItem=({id, title, description, date, MLMood, dbId})=>{
    const navigation=useNavigation()
    const timestamp=date['seconds']
    const journalDate=new Date(timestamp *1000)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
    const todayDate=journalDate.getDate() +' '+monthNames[journalDate.getMonth()] + ', '+ journalDate.getFullYear();
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text>{todayDate}</Text>
            {MLMood?<Text>ML-assessed mood: {MLMood}</Text>:null}
            <TouchableOpacity onPress={()=>navigation.navigate('Entry', {title, description, dbId})} style={styles.button}>
                <Text style={styles.text}>Expand</Text>
            </TouchableOpacity>
        </View>
    )
}
export default JournalItem;