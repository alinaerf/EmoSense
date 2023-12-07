import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/User/user-page';
import SettingsScreen from '../screens/User/settings-page';
import FeedbackScreen from '../screens/User/send-feedback-page';
import AboutScreen from '../screens/User/about-page';
export default function UserNav(){
    const UserStack=createStackNavigator();
    return(
        <UserStack.Navigator
            screenOptions={{
                headerShown:false,
            }}
        >
            <UserStack.Screen name="Me" component={UserScreen} />
            <UserStack.Screen name= "Settings" component={SettingsScreen}/>
            <UserStack.Screen name="Feedback" component={FeedbackScreen}/>
            <UserStack.Screen name="About" component={AboutScreen}/>

          </UserStack.Navigator>
    )
}