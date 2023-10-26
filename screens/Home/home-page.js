import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ArticleList from '../../components/article-list';
export default function HomeScreen({navigation}) {
  return (
    <ScrollView>
      <View style={{height:200, backgroundColor:'#AD40AF', justifyContent:'center',alignItems: 'center'}}>
      <Text style={{ fontSize: 25, color:'white'}}>Welcome back, Emily!</Text>
      </View>
      <Text style={{fontSize:20, marginLeft:10, marginVertical:10, fontWeight:700}}>Articles for you</Text>
      <ArticleList/>

      <Text style={{fontSize:20, marginLeft:10, marginVertical:10, fontWeight:700}}>Trending articles</Text>
      <ArticleList/>





</ScrollView>
  );
}