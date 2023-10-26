import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/User/user-page';
import SettingsScreen from '../screens/User/settings-page';
export default function UserNav(){
    const UserStack=createStackNavigator();
    return(
        <UserStack.Navigator>
            <UserStack.Screen name="Me" component={UserScreen} />
            <UserStack.Screen name= "Settings" component={SettingsScreen}/>
          </UserStack.Navigator>
    )
}