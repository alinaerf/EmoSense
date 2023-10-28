import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login/login-page';
import RegistrationScreen from '../screens/Login/register-page';
const Stack=createStackNavigator();
export default function AuthStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegistrationScreen}/>
        </Stack.Navigator>
    )
}