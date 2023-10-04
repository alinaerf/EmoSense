import { StyleSheet, Text, View } from 'react-native';

export default function UserSreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text
        style={{ fontSize: 26, fontWeight: 'bold' }}> User Screen</Text>
</View>
  );
}