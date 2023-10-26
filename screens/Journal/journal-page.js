import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import JournalList from '../../components/journal-list';

export default function JournalScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' , padding:10}}>
    <JournalList/>
    <TouchableOpacity style={{ backgroundColor:'purple', height:50, justifyContent:'center', marginVertical:10}} onPress={()=>navigation.navigate("Add")}>
        <Text style={{color: 'white', fontSize:15, textAlign:'center'}}>Add a new entry</Text>
    </TouchableOpacity>
       
    
</View>
  );
}