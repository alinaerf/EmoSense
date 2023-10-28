import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeNav from './home-stack';
import JournalNav from './journal-stack';
import UserNav from './user-stack';
//Screen names
const homeName = "Home";
const userName = "User";
const journalName="Journal";

const Tab = createBottomTabNavigator();
function MainContainer() {
  return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === userName) {
              iconName = focused ? 'person' : 'person-outline';

            } else if (rn === journalName) {
              iconName = focused ? 'book' : 'book-outline';

            }     

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeNav} />
        <Tab.Screen name={journalName} component={JournalNav} />
        <Tab.Screen name={userName} component={UserNav} />        
      </Tab.Navigator>
  );
}

export default MainContainer;