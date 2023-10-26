import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/home-page';
export default function HomeNav(){
    const HomeStack=createStackNavigator();
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Articles" component={HomeScreen} />
          </HomeStack.Navigator>
    )
}