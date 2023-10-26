import { TouchableOpacity, Text } from 'react-native'

export default function ArticleBanner({title, description}){
    return (
        <TouchableOpacity
        style={{padding:30, borderWidth:1, borderRadius:10, marginVertical:5}}>
            <Text>{title}</Text>
            <Text>{description}</Text>
        </TouchableOpacity>
    )
}