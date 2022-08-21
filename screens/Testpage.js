import React from 'react'
import {View} from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
/* import Icon from 'react-native-ico-material-design'; */
export default function Testpage() {
  return (
    <View>
      {/*  <Icon name="add-plus-button" height="40" width="40" /> */}
     <MaterialCommunityIcons name="home" size={30}/>
    {/*  <MaterialCommunityIcons name="edit" size={30}/> */}
    {/*  <MaterialCommunityIcons name="add" size={24} color="black" /> */}
    </View>
  )
}
