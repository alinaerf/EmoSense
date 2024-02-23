import { TouchableOpacity, Text, Image, Linking } from 'react-native'

export default function ArticleBanner({ title, description, link, img }) {
    const redirectToArticle = () => {
        Linking.openURL(link)
    }
    return (
        <TouchableOpacity
        style={{padding:30,  borderRadius:30, marginVertical:5, backgroundColor:'white', marginVertical:10}} onPress={redirectToArticle}>
            <Image source={{uri:img}} style={{width:350, height:150, borderRadius:10, alignSelf:'center'}}/>
            <Text style={{fontWeight:'bold'}}>{title}</Text>
            <Text>{description}</Text>
        </TouchableOpacity>
    )
}