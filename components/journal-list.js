import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { DUMMY_DATA } from "../data/dummy";
import JournalItem from "./journal-item";

const JournalList =({navigation})=>{
    const renderItem =({item})=>{
        return <JournalItem title={item.title}/>
    }
    return (
        <View>
            <FlatList
                data={DUMMY_DATA}
                keyExtractor={item=>item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
export default JournalList;