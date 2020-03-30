import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../store/user';
import { Chip } from 'react-native-paper';

class Signup extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
      name: '',
      sex: '',
      birthdate: '',
      height: '',
      weight: '',
      glutenFree: false,
      dairyFree: false,
      nutFree: false,
      vegan: false,
      vegetarian: false,
      pescatarian: false,
      lowCarb: false,
      lowFat: false,
      lowSugar: false
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSignup() {
    const {
      email,
      password,
      name,
      sex,
      dietaryPreference,
      birthdate,
      height,
      weight,
    } = this.state;
    let userInfo = {
      email,
      password,
      name,
      sex,
      dietaryPreference,
      birthdate,
      height,
      weight,
    };
    console.log('checking this.state', this.state);
    console.log('checking userInfo', userInfo);
    this.props.signupDispatch(userInfo);

    return this.navigation.push('Login');
  }

  handleSelect() {
    this.setState({
      glutenFree: !this.state.glutenFree
    })
    if (chipPressed) {
      chipPressed(this.state.glutenFree)
    }
    // setSelected(!selected)
    // if (chipPressed) {
    //   chipPressed(selected)
    // }
    // if () {
    //   // change styling
    // // re set state to true
    // } else {
    //   // change styling back to original
    //   // re set state to false
    // }

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.headerText}>Email:</Text>
          <TextInput
            style={styles.text}
            onChangeText={text => {
              this.setState({ ...this.state, email: text });
            }}
          />

          <Text style={styles.headerText}>Password:</Text>
          <TextInput
            style={styles.text}
            onChangeText={text => {
              this.setState({ ...this.state, password: text });
            }}
          />

          <Text style={styles.headerText}>Name:</Text>
          <TextInput
            style={styles.text}
            onChangeText={text => {
              this.setState({ ...this.state, name: text });
            }}
          />

          <Text style={styles.headerText}>Date of Birth:</Text>
          <TextInput style={styles.text} />

          <Text style={styles.headerText}>Sex:</Text>
          <TextInput style={styles.text} />

          <Text style={styles.headerText}>Height:</Text>
          <TextInput style={styles.text} />

          <Text style={styles.headerText}>Weight:</Text>
          <TextInput style={styles.text} />

          <Text style={styles.headerText}>Dietary Preference:</Text>
          <View style={styles.chipContainer}>
            <Chip selected={this.state.vegan} key={'vegan'} style={styles.chip} onPress={(vegan) => {this.handleSelect(vegan)}}>Vegan</Chip>
            <Chip selected={this.state.vegetarian} style={styles.chip} onPress={(vegetarian) => {this.handleSelect(vegetarian)}}>Vegetarian</Chip>

            <Chip selected={this.state.pescatarian} style={styles.chip} onPress={() => {
              !this.state.pescatarian ? this.setState({pescatarian: true}) : this.setState({pescatarian: false})
            }}>Pescatarian</Chip>

            <Chip selected={this.state.glutenFree} style={styles.chip} onPress={this.handleSelect}>Gluten-Free</Chip>

            <Chip selected={this.state.dairyFree} style={styles.chip} onPress={this.handleSelect}>Dairy-Free</Chip>
            <Chip selected={this.state.nutFree} style={styles.chip} onPress={this.handleSelect}>Nut-Free</Chip>
            <Chip selected={this.state.lowCarb} style={styles.chip} onPress={this.handleSelect}>Low-Carb</Chip>
            <Chip selected={this.state.lowFat} style={styles.chip} onPress={this.handleSelect}>Low-Fat</Chip>
            <Chip selected={this.state.lowSugar} style={styles.chip} onPress={this.handleSelect}>Low-Sugar</Chip>
          </View>

          <View style={styles.signupButton}>
            <Button onPress={this.handleSignup} title="Sign Up" color="green" />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#659B0E',
    padding: 10,
    marginTop: 25,
  },
  text: {
    width: 80,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop: 12,
  },
  chipContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chip: {
    alignItems: 'center',
    width: 105,
    color: 'black'
  },
  selectedChip: {

  }
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signupDispatch: userInfo => dispatch(signup(userInfo)),
});

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default ConnectedSignup;
