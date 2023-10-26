import { createStackNavigator } from '@react-navigation/stack';
import JournalScreen from '../screens/Journal/journal-page';
import EntryPage from '../screens/Journal/entry-page';
import AddEntryScreen from '../screens/Journal/add-entry-page';
export default function JournalNav(){
    const JournalStack=createStackNavigator();
    return(
        <JournalStack.Navigator>
            <JournalStack.Screen name="JournalList" component={JournalScreen}/>
            <JournalStack.Screen name= "Entry" component={EntryPage}/>
            <JournalStack.Screen name="Add" component={AddEntryScreen}/>
          </JournalStack.Navigator>
    )
}