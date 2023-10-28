import {Text, View } from 'react-native';
import { useRoute } from '@react-navigation/core';
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