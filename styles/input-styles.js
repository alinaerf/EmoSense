import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    titleInput: {
        margin: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: 'white',
        marginVertical: 10,
        fontSize: 35,
        maxHeight: 80
    },
    textInput: {
        margin: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        fontSize: 20,
        maxHeight: 500,
        minHeight: 250
    }, 
    submitButton: {
        backgroundColor: '#7455f6',
        borderRadius: 50,
        padding: 5,
        margin:10
    }, 
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
})
export default styles;