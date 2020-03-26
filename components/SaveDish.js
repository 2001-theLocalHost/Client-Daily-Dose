import React from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Text, Picker} from 'react-native';
import { Formik } from 'formik';

const SaveDish = (props) => {
  console.log('inside saveDish dishnut', props.dishNut)
  let dishNut;
  if (props.dishNut) {
    dishNut = props.dishNut
  }
  console.log('just the dish', dishNut)
  return (
    <Modal
    visible={props.modalOpen}
    animationType="slide"
    transparent={false}>
      <View style={styles.form}>
        <Formik
        initialValues={{
          name: dishNut.name,
          mealType: ''
        }}
        onSubmit={(values) => {
          props.onSave(values)
        }}
        >
          {(formikProps) => (
            <View>
              <Text>Dish Name:</Text>
              <TextInput
                placeholder='Dish Name'
                onChangeText={formikProps.handleChange('name')}
                value={formikProps.values.name}
              />
              <Text>Meal Type:</Text>
              <Picker
                style={styles.dropdowns}
                itemStyle={{height: 45}}
                selectedValue={formikProps.values.mealType}
                onValueChange={(itemValue) => {
                  formikProps.setFieldValue('mealType', itemValue)}}
              >
                <Picker.item
                  label={'Breakfast'}
                  value={'Breakfast'}
                />
                <Picker.item
                  label={'Lunch'}
                  value={'Lunch'}
                />
                <Picker.item
                  label={'Dinner'}
                  value={'Dinner'}
                />
                <Picker.item
                  label={'Snack'}
                  value={'Snack'}
                />

              </Picker>
              {/* <Text>Health Labels:</Text>
              <TextInput
                placeholder='Health Labels'
                onChangeText={formikProps.handleChange('healthLabels')}
                value={formikProps.values.healthLabels}
              />
              <Text>Meal Type:</Text>
              <TextInput
                placeholder='Meal Type'
                onChangeText={formikProps.handleChange('mealType')}
                value={formikProps.values.mealType}
              /> */}

              {/* values[name].includes(option) */}

                {/* <CheckBox
    style={{ marginVertical: 6 }}
                  text="Documents Verification"
                  // textStyle={styles.labelColor}
                  status="warning"
                  checked={formikProps.values.check}
                  onChange={(val) => setFieldValue('documents_status', !formikProps.values.check)}
                /> */}
              {/* <CheckBox
                // containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Meal Type'
                checkedTitle='You chose meal type'
                checked={formikProps.values.check}
                onPress={() => setFieldValue('check', !formikProps.values.check)}
              /> */}
              <Button title='submit' color='maroon' onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

export default SaveDish

const styles = StyleSheet.create({
  form: {
    fontSize: 20,
    padding: 10,
    borderRadius: 6,
    marginTop: 100
  }
});
