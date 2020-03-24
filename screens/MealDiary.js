import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Picker,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchDishes } from '../store/mealdiary'
import { connect } from 'react-redux';
import CalendarView from '../components/CalendarView'



class MealDiary extends React.Component {
    constructor() {
        super()

        this.state = {
            date: '',
        }

this.addDate = this.addDate.bind(this)

}
 addDate (date) {
    // let clonedState = {...this.state}
    // clonedState.date = date
    this.setState({
        date: date
    })
 }   

getDishes() {
    this.props.fetchDishes(this.state.date)
}

render() {
    return (
     <ScrollView>
    <View>
    <View>
        <CalendarView addDate={this.addDate}/>
    </View>
    <Button
    onPress={() => {this.getDishes;}}
    title="Submit"
    color="red"
    />
      <Text>Breakfast</Text>
      {this.props.breakfast.map((dish, index) => {
          return (
              <View key={index}>
          <Text>{dish.dishName}</Text>
          </View>
          )
      })}
      <Text>Lunch</Text>
      {this.props.lunch.map((dish, index) => {
          return (
              <View key={index}>
          <Text>{dish.dishName}</Text>
          </View>
          )
      })}
      <Text>Dinner</Text>
      {this.props.dinner.map((dish, index) => {
          return (
              <View key={index}>
          <Text>{dish.dishName}</Text>
          </View>
          )
      })}
    </View>
    </ScrollView>
        );
    }

};

const mapState = state => {
    return {
        breakfast: state.mealdiary.breakfast,
        lunch: state.mealdiary.lunch,
        dinner: state.mealdiary.dinner 
    }
}

const mapDispatch = dispatch => {
    return {
        fetchDishes: (date) => 
        dispatch(fetchDishes(date))
    }
}

export default connect(mapState, mapDispatch)(MealDiary);