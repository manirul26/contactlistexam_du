import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Contactlist from './screens/Contactlist'
import Contact from './screens/Contact'
import Testpage from './screens/Testpage'
import Profile from './screens/Profile'
import Editcontact from './screens/Editcontact'
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contactlist" component={Contactlist} 
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => 
              navigation.navigate("Contact")} >
                <FontAwesome5 name='user-alt' size={25} color='black' />
              </TouchableOpacity>
            ),
          })}
        />
         <Stack.Screen name="Contact" component={Contact} 
         
        />
         <Stack.Screen name="Testpage" component={Testpage} 
         
         />
             <Stack.Screen name="Profile" component={Profile} 
         
         />
        <Stack.Screen name="Editcontact" component={Editcontact}/>

         

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;