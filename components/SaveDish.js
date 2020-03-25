import React from 'react';
import { StyleSheet, View, TextInput, Button, Modal, Text, CheckBox} from 'react-native';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons'
import { Checkbox } from 'react-native-paper';

// "healthLabels": "SUGAR CONSCIOUS, VEGAN, VEGETARIAN, PEANUT FREE, TREE NUT FREE",
// "imgUrl": "file:///Users/emmafox/Library/Developer/CoreSimulator/Devices/08B5A281-0ED6-4FC1-A8CC-EE75FF206B85/data/Containers/Data/Application/18CF2E42-A9B9-4766-ACC2-796A0E5AC62F/Library/Caches/ExponentExperienceData/%2540fox-emma%252FFoodMobileApp/ImagePicker/5B69B7A3-22B7-482C-92FC-A8E736638506.jpg",
// "name": "Stout Cake",

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
          healthLabels: dishNut.healthLabels,
          mealType: '',
          check: false
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
