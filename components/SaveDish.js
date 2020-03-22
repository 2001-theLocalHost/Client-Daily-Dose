import React from 'react';
import { StyleSheet, View, TextInput, Button, Modal} from 'react-native';
import { Formik } from 'formik';

const SaveDish = (props) => {
  return (
    <Modal
    visible={props.modalOpen}
    animationType="slide"
    transparent={false}>
      <View style={styles.form}>
        <Formik
        initialValues={{
          dishName: '',
          mealType: ''
        }}
        onSubmit={(values) => {
          props.onSave(values)
        }}
        >
          {(formikProps) => (
            <View>
              <TextInput
                placeholder='Dish Name'
                //placedholder --> bring in info from confirm ingredients page
                onChangeText={formikProps.handleChange('dishName')}
                value={formikProps.values.dishName}
              />
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
