import React, { useState, useEffect } from 'react'
import {
   View, Text, StyleSheet, Alert,
   PermissionsAndroid,
   SafeAreaView
} from 'react-native';
import Contacts from 'react-native-contacts';
import { Button, TextInput, IconButton } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Contact({ navigation }) {

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumbers, setPhoneNumbers] = useState(['']);

   useEffect(() => {
      if (phoneNumbers[phoneNumbers.length - 1].length > 0) {
         setPhoneNumbers((prevState) => [...prevState, '']);
      }
      try {
         if ((phoneNumbers[phoneNumbers.length - 2].length === 0) && (phoneNumbers.length >= 2)) {
            setPhoneNumbers((prevState) => {
               const newState = prevState.slice();
               newState.pop()
               return newState;
            })
         }
      } catch { }
   }, [phoneNumbers])


   async function addContact() {
      try {
         const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
         );
         if (permission === 'granted') {
            // alert('Permission ok')
            /////////////////////////////////////////////////////////////
            if ((!firstName && !lastName) || phoneNumbers.length === 1) {
               Alert.alert('Fill Up all the Required Fields');
               return;
            }
            const myPhonenumbers = phoneNumbers.map((ph) => {
               return { label: 'mobile', number: ph };
            });

            const contactInfo = {
               displayName: firstName + ' ' + lastName,
               givenName: firstName + ' ' + lastName,
               phoneNumbers: myPhonenumbers
            }
            Contacts.addContact(contactInfo)
               .then(() => navigation.navigate('Contactlist'))
               .catch((error) => console.log(error))

            ////////////////////////////////////////////////////////////
         }
      } catch (error) {
         // console.log(error);
         alert(error)
      }
      /*   
       */

   }

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.inputContainer}>
            <TextInput
               label="First Name"
               leading={props =>
                  <FontAwesome5 name='user-alt' size={15} color='black' />}
               value={firstName}
               onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
               label="Last Name"
               leading={props =>
                  <FontAwesome5 name='user-alt' size={15} color='black' />}
               value={lastName}
               onChangeText={(text) => setLastName(text)}
            />
         </View>
         {phoneNumbers.map((phoneNumber, index) => (
            <View style={{ ...styles.inputContainer, marginVertical: 0 }}
               key={index}>
               <TextInput
                  label="Phone No"
                  leading={props =>
                     <FontAwesome5 name='phone-alt' size={15} color='black' />}
                  keyboardType='number-pad'
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumbers((prevState) => {
                     const newState = prevState.slice();
                     newState[index] = text;
                     return newState;
                  })}
               />

            </View>
         ))}
         <View style={styles.inputContainer}>
            <Button
               title='Save'
               
               style={{ alignSelf: "center", 
               marginTop: 0, width: '100%',
               backgroundColor: '#BCCFA6', color: '#000'
             }}
               onPress={() => addContact()}
            />
         </View>

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   inputContainer: {
      padding: 5,
      margin: 0
   },
   input: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      marginBottom: 10,
      borderRadius: 25
   }
})