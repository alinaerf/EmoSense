import {FlatList, Text, View} from 'react-native'
import ArticleBanner from './article-banner'
import { ARTICLE_DATA } from '../data/articles'

export default function ArticleList(){
    const renderItem=({item})=>{
        return <ArticleBanner title={item.title} description={item.description}/>
    }
    return(
        <View>
                    <FlatList 
            horizontal={true}
            data={ARTICLE_DATA}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />
        </View>

    )
}