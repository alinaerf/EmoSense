import { Text, SafeAreaView, FlatList, View } from "react-native"
export default function AboutScreen({}){
    return(
        <SafeAreaView>
            <Text style={{
                    fontSize:28,
                    fontWeight: '500', 
                    color:"#333", 
                    marginBottom:20,
                    marginHorizontal:10
                }}>About EmoSense</Text>
            <Text style={{marginHorizontal:10, marginBottom:20,}}>
            EmoSense is a mobile application that aims to improve one’s understanding of well-being and emotional intelligence, as well as provide insights that are self-help and education-focused. The primary objectives and functionality of the application are:
            </Text>
            <FlatList
            data={[
                {key: "Help users gain insights into their emotions and mental health"}, 
                {key: "Offer relevant resources and potential activities to improve EQ"}, 
                {key:"Track one’s emotional health over time with visual representations (graphs)"}
            ]}
            renderItem={({ item }) => {
                return (
                  <View style={{ marginBottom: 10, marginHorizontal:10 }}>
                    <Text >{`\u2022 ${item.key}`}</Text>
                  </View>
                );
              }}
            />


        </SafeAreaView>
    )
}