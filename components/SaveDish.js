import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  Picker,
} from 'react-native';
import { Formik } from 'formik';
import {Overlay} from 'react-native-elements'

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
              </View>
              <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                color="green"
                style={styles.button}
                onPress={formikProps.handleSubmit}
              />
              <Button
                title="Cancel"
                color="red"
                style={styles.button}
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
    backgroundColor: 'orange',
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
  button: {
    backgroundColor: 'black',
    opacity: 1
  },
  dropdown: {
    height: 39,
    width: 180,
    fontSize: 14,
    color: 'black',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    marginTop: 5,
    opacity: .8
  }
});
