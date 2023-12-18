import { useNavigation } from "@react-navigation/core";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

const JournalItem=({id, title, description, date})=>{
    const navigation=useNavigation()
    const timestamp=date['seconds']
    const journalDate=new Date(timestamp *1000)
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    
    const todayDate=journalDate.getDate() +' '+monthNames[journalDate.getMonth()] + ', '+ journalDate.getFullYear();
    return(
        <View style={{padding:30, borderWidth:1, borderRadius:10, marginVertical:5, backgroundColor:'white', marginVertical:10}}>
            <Text style={{fontSize:18, fontWeight:600}}>{title}</Text>
            <Text>{todayDate}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Entry', {title, description})} style={{backgroundColor:'#7455f6', justifyContent:'center', alignItems:'center', borderRadius:5, marginTop:5, padding:5}}>
                <Text style={{color:'white', fontSize:15}}>Expand</Text>
            </TouchableOpacity>
        </View>
    )
}
export default JournalItem;