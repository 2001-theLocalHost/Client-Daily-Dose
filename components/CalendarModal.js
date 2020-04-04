import React, {useState} from 'react';
import {
  Button,
  View,
  Platform
} from 'react-native';
import {Overlay} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarModal = (props) => {
  const [date, setDate] = useState(props.date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.addDate(currentDate)
  };

  return (
    <Overlay isVisible={props.isVisible} width={'75%'} height={'30%'} animationType={'fade'} overlayBackgroundColor={'white'} windowBackgroundColor='rgba(0, 0, 0, 0.5)'>
          <View>
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
    </View>
      <Button title='Submit' onPress={props.closeDateModal}/>
    </Overlay>
  )
}

export default CalendarModal
