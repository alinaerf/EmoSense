import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text
        style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
    <Text style={{ fontSize: 10 }}>
      Welcome back, Alina!
    </Text>
</View>
  );
}