import React, {useState} from 'react';
import {View, Platform, StyleSheet,} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { consolidatingDataFromMealDiary } from '../store/dishes';

const CalendarView = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.addDate(currentDate)
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // let status = true 
  // const showDatepicker = () => {
  //   if (status === true) {
  //     showMode('date'); //open calendar
  //   } else {
  //     // onClose() //close calendar
  //     console.log('closing calendar, ', status)
  //   }
  //   status = !status
  // };

  const showDatepicker = () => {
      showMode('date'); 
  };

  return (
    <View>
      <View >
        <Button
          icon={
          <Icon
          name="calendar"
          size={50}
          color="gray"
          />
          }
          buttonStyle={{
            backgroundColor: 'transparent',
            marginTop: 90
          }}
          onPress={showDatepicker}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon:{
    position: 'absolute',
    right:0,
    top:15
  },
})

export default CalendarView;
