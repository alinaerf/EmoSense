import { Text, TouchableOpacity, View, StyleSheet} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function SettingsScreen({ navigation }) {
    //const {userId, setUserId}=useContext(CurrentUser)

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
                <TouchableOpacity style={{flex:1, paddingVertical:10, paddingHorizontal:10}}></TouchableOpacity>
                <TouchableOpacity style={{flex:0, paddingVertical:10, paddingHorizontal:10}} onPress={()=> navigation.navigate("User", {screen: 'Settings'})}>< MaterialCommunityIcons name='dots-grid' size={30} color={'black'}/></TouchableOpacity>
            </View>
            <Text  style={{ fontSize: 35, color:'black', justifyContent:'center'}}> Settings</Text>
        </View>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
                <Text style={styles.text}>Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={seeAbout}>
                <Text style={styles.text}>About the app</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={sendFeedback}>
                <Text style={styles.text}>Suggestions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={logOut}>
                <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
                <Text style={{fontSize:25, marginLeft:10, color:'red'}}>Delete account</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    btn: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        backgroundColor: 'white',
        height: 50,
        justifyContent: 'center'
    }, 
    text: {
        fontSize: 25,
        marginLeft: 10
    }
})