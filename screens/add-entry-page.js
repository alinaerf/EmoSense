import { View, TextInput, StyleSheet, Text } from "react-native"
import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
export default function AddEntryScreen({navigation}){
    const [title, onChangeTitle] = React.useState('');
    const [description, onChangeDesc] = React.useState('');

    return(
        <View>
            <TextInput
                value={title}
                onChangeText={onChangeTitle}
                placeholder="Title"
                style={style.input1}
            />
            <TextInput
                value={description}
                onChangeText={onChangeDesc}
                placeholder="Description"
                style={style.input2}
            />
            <TouchableOpacity onPress={()=>navigation.navigate("JournalList")}  style={{ backgroundColor:'purple'}}>
                <Text style={{color: 'white', fontSize:15, textAlign:'center'}}>Add!</Text>
            </TouchableOpacity>

        </View>
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