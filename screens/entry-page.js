import {Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/core';
const Stack = createStackNavigator();
function EntryPage(){
    const route=useRoute()
    const {title, description}=route.params
    return(
        <View>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    );
};
export default EntryPage;