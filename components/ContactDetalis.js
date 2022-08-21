import React from 'react'
import { View, StyleSheet, Text,Dimensions,
   Animated, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { getColorByLetter } from '../colors/color';
 import Swipeable from 'react-native-gesture-handler/Swipeable';
 import { GestureHandlerRootView } from "react-native-gesture-handler";
 import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
//import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
const SCREEN_WIDTH = Dimensions.get('window').width;
import Contacts from 'react-native-contacts';

function ContactDetalis({ contactInfo, data }) {
   const navigation = useNavigation();
   const { displayName } = contactInfo;
 //  const {autoid} = data;
   const [autoid, setAutoid] = useState(data);
   const color = getColorByLetter(displayName[0]);
  // console.log('autoid......' + data)

    const leftSwipe = (progress, dragX, ) => {
      const scale = dragX.interpolate({
         inputRange: [-30, 0.5],
         outputRange: [1, 0.1]
      })
      const Style = {
         transform: [
            {
               scale
            }
         ]
      }
      return (
        <TouchableOpacity activeOpacity={0.6}>
          <View style={styles.deleteBox}>
          <View 
          style={{ width: '50%', 
         marginRight: 5, }}
        >
             <AntDesign name='edit' size={20} color='black' style={{
                marginRight: 7
             }} 
             onPress={() => 
               navigation.navigate('Editcontact', {
                       contactInfo: { id: autoid }
                    })}
             />
             </View>

             <View
              style={{ width: '50%', 
              marginRight: 5, }}
              onPress={() => deleteContact(autoid)} 
             >
            <AntDesign name='delete' size={20} color='red' style={{
                marginLeft: 7
             }}/>
             </View>
          </View>
        </TouchableOpacity>
      );
    };
    function deleteContact(contact) {
      Contacts.deleteContact(contact)
         .then(() => navigation.navigate('Contactlist'))
         .catch((error) => console.log(error));
   }

   return (
      <GestureHandlerRootView>
       <Swipeable /* renderLeftActions={leftSwipe}  */ renderRightActions={leftSwipe}
       overshootLeft={false}
     /*   onSwipeableRightOpen={() => deleteItem(displayName.recordID)} */
       > 
      <View style={styles.card}>
         <View style={styles.infoContainer}>
            <View style={{...styles.icon, backgroundColor: color}}>
               <Text style={styles.iconContent}>{displayName[0]}</Text>
            </View>
            <Text style={styles.primaryText}>{displayName}</Text>
         </View>
      </View>
       </Swipeable>
</GestureHandlerRootView>
   )
}

const styles = StyleSheet.create({
   card: {
      padding: 10,
      margin: 5,
      width: SCREEN_WIDTH,
      borderBottomWidth: 1,
      borderBottomColor: '#E6E6E6'
   },
   infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5
   },
   primaryText: {
      fontSize: 18
   },
   iconContent: {
      flex: 1,
      paddingVertical: 5,
      fontSize: 24,
      color: 'white',
      marginHorizontal: 10
   },
   icon:{
      borderRadius: 25,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
      padding: 1,
      backgroundColor: 'green'
   },
   deleteBox: {
      flexDirection: 'row',
      alignContent: 'space-between',
      width: 100,
      backgroundColor: '#DCDADA',
      padding: 20
   }
})
export default ContactDetalis;
