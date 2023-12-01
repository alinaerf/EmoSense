import {Text, View } from 'react-native';
import { useRoute } from '@react-navigation/core';
function EntryPage(){
    const route=useRoute()
    const {title, description}=route.params
    return(
        <View>
            <Text style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:20,
                    marginHorizontal:10
                }}>{title}</Text>
            <Text style={{marginHorizontal:10}}>{description}</Text>
        </View>
    );
};
export default EntryPage;