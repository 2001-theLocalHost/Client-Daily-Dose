import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Picker,
} from 'react-native';
import { Formik } from 'formik';
import {Overlay, Button} from 'react-native-elements'
import { Feather } from '@expo/vector-icons';

const SaveDish = props => {
  let dishNut;
  if (props.dishNut) {
    dishNut = props.dishNut;
  }
  return (
    <Overlay isVisible={props.isVisible} width={'75%'} height={'20%'} animationType={'fade'} overlayBackgroundColor={'white'}>
      <View style={styles.form}>
        <Formik
          initialValues={{
            name: dishNut.name,
            mealType: '-',
          }}
          onSubmit={(values) => (!values.name || values.mealType === '-' ? alert('All Fields Required') : props.onSave(values))}
        >
          {formikProps => (
            <View style={styles.textContainer}>
              <View style={styles.dishContainer}>
              <Text style={styles.headerText}>Dish Name:</Text>
              <TextInput
                style={styles.text}
                placeholder="Dish Name"
                onChangeText={formikProps.handleChange('name')}
                value={formikProps.values.name}
              />
              </View>
              <View style={styles.mealTypeContainer}>
                <Text style={styles.headerText}>Meal Type:</Text>
                <Picker
                  itemStyle={styles.dropdown}
                  selectedValue={formikProps.values.mealType}
                  onValueChange={itemValue => {
                    formikProps.setFieldValue('mealType', itemValue);
                  }}
                >
                  <Picker.Item label="-" value="-" />
                  <Picker.Item label="Breakfast" value="Breakfast" />
                  <Picker.Item label="Lunch" value="Lunch" />
                  <Picker.Item label="Dinner" value="Dinner" />
                  <Picker.Item label="Snack" value="Snack" />
                </Picker>
                <View style={styles.icon}>
                  <Feather name="chevrons-down" size={15} color="black" />
                </View>
              </View>
              <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                titleStyle={{
                  color: 'white',
                  fontSize: 15,
                  lineHeight: 15,
                }}
                buttonStyle={{
                  backgroundColor: '#659B0E',
                  opacity: .8,
                  borderRadius: 20,
                  height: 35,
                  width: 75,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 12,
                  marginRight: 2.5
                }}
                onPress={formikProps.handleSubmit}
              />
              <Button
                title="Cancel"
                titleStyle={{
                  color: 'white',
                  fontSize: 15,
                  lineHeight: 15,
                }}
                buttonStyle={{
                  backgroundColor: '#FF7F4B',
                  borderRadius: 20,
                  height: 35,
                  width: 75,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 12,
                  marginLeft: 2.5
                }}
                onPress={props.handleCancel}
              />
              </View>
            </View>
          )}
        </Formik>
      </View>
      </Overlay>
  );
};

export default SaveDish;

const styles = StyleSheet.create({
  text: {
    width: 180,
    opacity: 0.8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center',
    borderRadius: 5
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 1,
    height: 850,
    width: 350,
    borderRadius: 10,
    marginTop: 30,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    opacity: 1,
    flexDirection: 'column'
  },
  dishContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  mealTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%'
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  icon: {
    backgroundColor: 'white',
    opacity: .8,
    height: 39,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 5,
    justifyContent: 'center'
  },
  dropdown: {
    height: 39,
    width: 168,
    fontSize: 14,
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // overflow: 'hidden',
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
    marginTop: 5,
    opacity: .8
  }
});
