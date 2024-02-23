import {FlatList, View} from 'react-native'
import ArticleBanner from './article-banner'
import React,{ useState } from 'react'
import { db } from '../firebase/config'
import { useFocusEffect } from '@react-navigation/native';

export default function ArticleList(){
    const renderItem=({item})=>{
        return <ArticleBanner title={item.title} description={item.text} link={item.link} img={item.imgUrl} />
    }
    const [data, setData]=useState([])
    const fetchData = async ()=>{
        try {
            const response= await db.collection('articles').get()
            const newData=[]
            response.forEach(doc =>{
                newData.push({id: doc.id, ...doc.data(),})
            })
            setData(prevData=>[...prevData, ...newData])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
    useFocusEffect(
        React.useCallback(() => {
          // Fetch data when the screen comes into focus
            setData([])
            fetchData();
        }, [])
      );
    return(
        <View style={{flex:3}}>
                    <FlatList 
            data={data}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />
        </View>

    )
}