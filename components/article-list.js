import {FlatList, Text, View} from 'react-native'
import ArticleBanner from './article-banner'
import { useState, useEffect } from 'react'
import { db } from '../firebase/config'

export default function ArticleList(){
    const renderItem=({item})=>{
        return <ArticleBanner title={item.title} description={item.text}/>
    }
    const [data, setData]=useState([])
    useEffect(()=>{
      const fetchData = async ()=>{
        try {
            const response= await db.collection('articles').get()
            const newData=[]
            response.forEach(doc =>{
                console.log(doc.data())
                newData.push(doc.data())
            })
            setData(prevData=>[...prevData, ...newData])
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      }
      fetchData();
    }, [])
    return(
        <View>
                    <FlatList 
            data={data}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />
        </View>

    )
}