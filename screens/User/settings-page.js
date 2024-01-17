import { Text, SafeAreaView, TouchableOpacity, View } from "react-native"
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <View>
        <View style={{height:200, backgroundColor:'white', justifyContent:'center',alignItems: 'center', borderRadius:20, paddingTop:30}}>
            <View style={{flexDirection:'row',  alignItems: 'center',justifyContent: 'flex-end',paddingHorizontal: 10}}>
                <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}><Fontisto name='bell' size={30} color={'black'}/></TouchableOpacity>
                <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}>< MaterialCommunityIcons name='dots-grid' size={30} color={'black'}/></TouchableOpacity>
            </View>
            <Text  style={{ fontSize: 35, color:'black', justifyContent:'center'}}> Settings</Text>
        </View>
            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8, backgroundColor:'white', height:50, justifyContent:'center'}}>
                <Text style={{fontSize:25, marginLeft:10}}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8, backgroundColor:'white', height:50, justifyContent:'center'}}>
                <Text style={{fontSize:25, marginLeft:10}}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8, backgroundColor:'white', height:50, justifyContent:'center'}} onPress={seeAbout}>
                <Text style={{fontSize:25, marginLeft:10}}>About the app</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8,backgroundColor:'white', height:50, justifyContent:'center'}} onPress={sendFeedback}>
                <Text style={{fontSize:25, marginLeft:10}}>Suggestions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8, backgroundColor:'white', height:50, justifyContent:'center'}} onPress={logOut}>
                <Text style={{fontSize:25, marginLeft:10}}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginVertical:10, marginHorizontal:20, borderWidth:1, borderRadius:8, backgroundColor:'white', height:50, justifyContent:'center'}}>
                <Text style={{fontSize:25, marginLeft:10, color:'red'}}>Delete account</Text>
            </TouchableOpacity>

        </View>
    )
}