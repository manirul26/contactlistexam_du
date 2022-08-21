import React, { useState, useEffect } from 'react'
import {
   FlatList,
   StyleSheet,
   TouchableOpacity,
   PermissionsAndroid,
   SafeAreaView,ActivityIndicator, Text, View
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useIsFocused } from '@react-navigation/native';
import { TextInput } from "@react-native-material/core";
import ContactDetalis from '../components/ContactDetalis';

import { withNavigation } from 'react-navigation';

export default function MyContacts({ navigation }) {

   const isFocused = useIsFocused();
   const [searchname, setSearchname] = useState('');
   const [myContacts, setMyContacts] = useState([]);
   const [filterdata, setFilterdata] = useState([]);
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      getAllContacts();
   }, [isFocused])

    useEffect( () => () => console.log("data1 update or unmount"), [ myContacts ] );
 


   async function getAllContacts() {
      try {
         const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
         );
         if (permission === 'granted') {
            const contacts = await Contacts.getAll();
            setMyContacts(contacts);
            setLoading(false);
         }
      } catch (error) {
         // console.log(error);
      }
   }

 /*  const searchFilter = (text) => {
     if(text){
      setLoading(true);
       const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
        const emailAddressRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (text === "" || text === null) {
         getAllContacts();
         setLoading(false);
        } else if (phoneNumberRegex.test(text)) {
          Contacts.getContactsByPhoneNumber(text).then(contacts => {
            setMyContacts(contacts);
            setLoading(false);
          });
        } else if (emailAddressRegex.test(text)) {
          Contacts.getContactsByEmailAddress(text).then(contacts => {
            setMyContacts(contacts);
            setLoading(false);
          });
        } 
        else { 
          Contacts.getContactsMatchingString(text).then(contacts => {
            setMyContacts(contacts);
            setLoading(false);
          });
        }

     }
  }
 */

   return (
      <SafeAreaView style={styles.container}>
       {/*   <TextInput
           leading={props =>
            <AntDesign name='search1' size={20} color='black' />}
            onChangeText={(text) => searchFilter(text)}
         /> */}
         {
            isLoading == true ?
            <View style={styles.spinner}>
            <ActivityIndicator size={32}/>
            </View>
            :
            <FlatList
            isLoading ={isLoading}
               data={myContacts}
               keyExtractor={(item) => item.recordID}
               renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Profile', {
                     contactInfo: { id: item.recordID }
                  })}>
                  
                     <ContactDetalis contactInfo={item}
                        data={item.recordID}
                        navigation={navigation} key={item.recordID}
                     /> 
                  </TouchableOpacity>
               )}
            />
         }
        

      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   addIcon: {
      bottom: 20,
      right: 20,
      position: 'absolute',
      zIndex: 1,
   },
   backTextWhite: {
      color: '#FFF',
   },
   rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
   },
   rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
   },
   backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
   },
   backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
   },
   backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
   },
   spinner: {
      flex: 1,
      flexDirection: 'column',
      alignContent: "center",
      justifyContent: "center"
    }
})
