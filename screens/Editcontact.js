import React, { useState, useEffect } from 'react'
import { 
   View, 
   Text,
   StyleSheet,
   Dimensions,
   StatusBar,
   FlatList, Alert,
   ActivityIndicator, PermissionsAndroid,
   Linking
} from 'react-native';
import Contacts from 'react-native-contacts';

import { Button, TextInput, IconButton } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getColorByLetter } from '../colors/color';

export default function Editcontact({ navigation, route }) {

   const [contactInfo, setContactInfo] = useState(null);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [phoneNumbers, setPhoneNumbers] = useState(['']);

   useEffect(() => {
      getContact(route.params.contactInfo.id);
   }, [route.params.contactInfo.id])

   function getContact(id) {
    Contacts.getContactById(id).then(contacts => {
     console.log(contacts)
     setContactInfo(contacts);
     setFirstName(contacts.givenName);
     setLastName(contacts.familyName);
     const a = contacts.phoneNumbers.map((item) => (item.number));
     setPhoneNumbers(a);
   });
   
   }

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
           if ((!firstName && !lastName) || phoneNumbers.length === 1 || route.params.contactInfo.id == "") {
             Alert.alert('Fill Up all the Required Fields');
             return;
          }
          const myPhonenumbers = phoneNumbers.map((ph) => {
             return { label: 'mobile', number: ph };
          });

          const contactInfo = {
            recordID: route.params.contactInfo.id,
             displayName: firstName + ' ' + lastName,
             givenName: firstName + ' ' + lastName,
            // phoneNumbers: myPhonenumbers
          }
            Contacts.updateContact(contactInfo, (err) => {
              if (err) throw err;
              // record updated
            }) 
         
          // update the first record
/*   let someRecord = contacts[0]
  someRecord.emailAddresses.push({
    label: "junk",
    email: "mrniet+junkmail@test.com",
  })
  Contacts.updateContact(someRecord, (err) => {
    if (err) throw err;
    // record updated
  }) */

       /*    const contactInfo = {
            recordID: route.params.contactInfo.id,
             displayName: firstName + ' ' + lastName,
             givenName: firstName + ' ' + lastName,
            // phoneNumbers: myPhonenumbers
          } */
      /*    console.log('con' + contactInfo)
           Contacts.updateContact(contactInfo)
             .then(() => navigation.navigate('Contactlist'))
             .catch((error) => console.log(error)) */
 
          ////////////////////////////////////////////////////////////
       }
    } catch (error) {
       // console.log(error);
       alert(error)
    }

 }


   
   if(!contactInfo) {
      return <ActivityIndicator size={32} />
   }

   return (
      <View style={styles.container}>
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
         <View style={{ flex: 1, marginTop: 20 }}>
         {phoneNumbers.map((phoneNumber, index) => (
            <View style={{ ...styles.inputContainer, marginVertical: 0 }}
               key={index}>
            <FlatList 
               data={contactInfo.phoneNumbers}
               keyExtractor={(item) => item.id}
               renderItem={({ item }) => (


                    <TextInput
               label="Phone No"
               leading={props =>
                  <FontAwesome5 name='phone-alt' size={15} color='black' />}
                  defaultValue={phoneNumbers}
               value={item.number}
               onChangeText={(text) => setPhoneNumbers((prevState) => {
                const newState = prevState.slice();
                newState[index] = text;
                return newState;
             })}
            />

               )}
            />
              </View>
         ))}
         </View>
   
{/*          <View style={{ flex: 1, marginTop: 20 }}>
             <Text>Edit Page {route.params.contactInfo.id}</Text>
             <Text>{contactInfo.displayName}</Text>
         </View> */}
         <View style={styles.inputContainer}>
            <Button
               title='Update'
               
               style={{ alignSelf: "center", 
               marginTop: 0, width: '100%',
               backgroundColor: '#BCCFA6', color: '#000'
             }}
               onPress={() => addContact()}
            />
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   backgroundImage: {
     width: Dimensions.get('screen').width,
     height: Dimensions.get('screen').height/3,
     alignItems: 'center',
     justifyContent: 'center',
   },
   mainText:{
     position: 'absolute',
     bottom: 20,
     left: 20,
     fontSize: 30,
     color: 'white',
     fontWeight: 'bold'
   },
   phonenNumberContainer: {
     flex: 1,
     marginHorizontal: 10,
     marginBottom: 20,
     paddingHorizontal: 10,
     elevation: 5,
     paddingVertical: 20,
     backgroundColor: 'white',
     flexDirection: 'row',
     justifyContent: 'space-between'
   }
 })