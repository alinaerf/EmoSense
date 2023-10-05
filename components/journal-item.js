import { useNavigation } from "@react-navigation/core";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

const JournalItem=({id, title, description})=>{
    const navigation=useNavigation()
    return(
        <TouchableOpacity 
            style={{padding:30, borderWidth:1, borderRadius:10, marginVertical:5}}
            onPress={()=>navigation.navigate('Entry', {title, description})}
            >
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}
export default JournalItem;