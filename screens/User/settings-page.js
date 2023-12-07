import { Text, SafeAreaView, TouchableOpacity } from "react-native"
export default function SettingsScreen({navigation}){
    const logOut = ()=>{
        navigation.navigate("Auth", {screen: 'Login'})
    }
    const sendFeedback=()=>{
        navigation.navigate("Feedback")
    }
    const seeAbout = ()=>{
        navigation.navigate("About")
    }
    return(
        <SafeAreaView>
            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}} onPress={seeAbout}>
                <Text style={{fontSize:25, marginLeft:10}}>About the app</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}} onPress={sendFeedback}>
                <Text style={{fontSize:25, marginLeft:10}}>Suggestions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}} onPress={logOut}>
                <Text style={{fontSize:25, marginLeft:10}}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8}}>
                <Text style={{fontSize:25, marginLeft:10, color:'red'}}>Delete account</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}