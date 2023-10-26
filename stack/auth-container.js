import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/Login/login-page';
import RegistrationScreen from '../screens/Login/register-page';
const Stack=createStackNavigator();
export default function AuthStack(){
    return(
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegistrationScreen}/>
        </Stack.Navigator>
        </NavigationContainer>
    )
}