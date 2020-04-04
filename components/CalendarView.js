import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarView = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.addDate(currentDate)
  };

  return (
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
  );
};

export default CalendarView;
