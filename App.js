import MainContainer from "./stack/main-container";
import AuthStack from "./stack/auth-container";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createContext, useState } from "react";

export const CurrentUser=createContext(null);
export default function App() {
  const AppStack=createStackNavigator();
  const [userId, setUserId]=useState(null);
  return (
    <CurrentUser.Provider
      value ={{
        userId, setUserId
      }}
    >
<NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown:false,
      }}
      >
        <AppStack.Screen name="Auth" component={AuthStack}/>
        <AppStack.Screen  name="Main" component={MainContainer}/>
      </AppStack.Navigator>
    </NavigationContainer>

    </CurrentUser.Provider>
  );
};