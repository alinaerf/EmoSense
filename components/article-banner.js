import { TouchableOpacity, Text, Image, Linking } from 'react-native'

export default function ArticleBanner({ title, description, link }) {
    const redirectToArticle = () => {
        Linking.openURL(link)
    }
    return (
        <TouchableOpacity
        style={{padding:30, borderWidth:1, borderRadius:10, marginVertical:5, backgroundColor:'white', marginVertical:10}} onPress={redirectToArticle}>
            <Image source={require('./images/placeholder-image.jpg')} style={{width:350, height:150, borderRadius:10, alignSelf:'center'}}/>
            <Text style={{fontWeight:'bold'}}>{title}</Text>
            <Text>{description}</Text>
        </TouchableOpacity>
    )
}