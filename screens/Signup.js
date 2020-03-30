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

class Signup extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
      name: '',
      sex: '',
      dietaryPreference: '',
      birthdate: '',
      height: '',
      weight: '',
    };
    this.handleSignup = this.handleSignup.bind(this);
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
          <TextInput style={styles.text} />

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
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  signupDispatch: userInfo => dispatch(signup(userInfo)),
});

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default ConnectedSignup;
