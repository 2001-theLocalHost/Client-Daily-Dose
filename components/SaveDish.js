import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Text,
  Picker,
} from 'react-native';
import { Formik } from 'formik';

const SaveDish = props => {
  let dishNut;
  if (props.dishNut) {
    dishNut = props.dishNut;
  }
  return (
    <Modal visible={props.modalOpen} animationType="slide" transparent={false}>
      <View style={styles.form}>
        <Formik
          initialValues={{
            name: dishNut.name,
            mealType: '',
          }}
          onSubmit={values => {
            props.onSave(values);
          }}
        >
          {formikProps => (
            <View>
              <Text>Dish Name:</Text>
              <TextInput
                placeholder="Dish Name"
                onChangeText={formikProps.handleChange('name')}
                value={formikProps.values.name}
              />
              <Text>Meal Type:</Text>
              <Picker
                style={styles.dropdowns}
                itemStyle={{ height: 45 }}
                selectedValue={formikProps.values.mealType}
                onValueChange={itemValue => {
                  formikProps.setFieldValue('mealType', itemValue);
                }}
              >
                <Picker.Item label="Breakfast" value="Breakfast" />
                <Picker.Item label="Lunch" value="Lunch" />
                <Picker.Item label="Dinner" value="Dinner" />
                <Picker.Item label="Snack" value="Snack" />
              </Picker>
              <Button
                title="submit"
                color="maroon"
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  );
};

export default SaveDish;

const styles = StyleSheet.create({
  form: {
    fontSize: 20,
    padding: 10,
    borderRadius: 6,
    marginTop: 100,
  },
});
