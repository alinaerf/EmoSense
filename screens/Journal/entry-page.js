import {Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/core';
function EntryPage({navigation}){
    const route=useRoute()
    const {title, description}=route.params
    return(
        <SafeAreaView>
            <Image source={require('./images/placeholder-image.jpg')} style={{width:350, height:200, borderRadius:10, alignSelf:'center'}}/>
            <View  style={{padding:30,height:'60%', borderRadius:10, marginVertical:5, backgroundColor:'white', marginVertical:10}}>
            <Text style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:20,
                    marginHorizontal:10
                }}>{title}</Text>
            <Text style={{marginHorizontal:10}}>{description}</Text>
            </View>
            <View>
            <TouchableOpacity onPress={()=>navigation.navigate('JournalList')} style={{backgroundColor:'#7455f6', justifyContent:'center', alignItems:'center', borderRadius:5, marginTop:5, padding:5, marginBottom:50}}>
                <Text style={{color:'white', fontSize:15}}>Close</Text>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
    );
};
export default EntryPage;