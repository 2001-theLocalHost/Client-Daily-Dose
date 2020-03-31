import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  ScrollView,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView'
import {Overlay} from 'react-native-elements'

const CalendarModal = (props) => {
  return (
    <Overlay isVisible={props.isVisible} width={'75%'} height={'65%'} animationType={'fade'} overlayBackgroundColor={'white'} windowBackgroundColor='rgba(0, 0, 0, 0.5)'>
      <CalendarView addDate={props.addDate}/>
      <Button title='Submit' onPress={props.closeDateModal}/>
    </Overlay>
  )
}

export default CalendarModal
