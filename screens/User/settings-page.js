import { Text, View, TouchableOpacity } from "react-native"
export default function SettingsScreen(){
    return(
        <View>
            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}}>
                <Text style={{fontSize:25, marginLeft:10}}>About the app</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}}>
                <Text style={{fontSize:25, marginLeft:10}}>Suggestions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}}>
                <Text style={{fontSize:25, marginLeft:10}}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}}>
                <Text style={{fontSize:25, marginLeft:10, color:'red'}}>Delete account</Text>
            </TouchableOpacity>

        </View>
    )
}