import {Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/core';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

function EntryPage({navigation}){
    const route=useRoute()
    const {title, description, dbId}=route.params
    return(
        <SafeAreaView>
            <Image source={require('./images/placeholder-image.jpg')} style={{width:350, height:200, borderRadius:10, alignSelf:'center'}}/>
            <View  style={{padding:30,height:'60%', borderRadius:10, marginVertical:5, backgroundColor:'white', marginVertical:10}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   <Text style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:20,
                    marginHorizontal:10
                    }}>{title}</Text>
                    <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => {
                        navigation.navigate("Add", {
                            add: false,
                            oldDesc: description,
                            oldTitle: title,
                            oldId:dbId
                        })
                    }}>
                    <Text><SimpleLineIcons  name='note' size={30} color={'gray'}/></Text>
                    </TouchableOpacity>    
            </View>
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