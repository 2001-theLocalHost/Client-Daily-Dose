import * as React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PasswordInputText from 'react-native-hide-show-password-input';
import { login } from '../store/user';

class Login2 extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
      placeholder: 'Password',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.loginDispatch(this.state.email, this.state.password);

    return this.navigation.dispatch(StackActions.popToTop());
  }

  render() {
    return (
      <View style={styles.background}>
        <ImageBackground
          source={{
            uri:
              'https://www.heart.org/-/media/aha/h4gm/article-images/fruit-and-vegetables.jpg',
          }}
          style={styles.image}
        >
          <View style={styles.loginBox}>
            <View style={styles.emailContainer}>
              <View style={styles.emailIcon}>
                <Ionicons name="md-person" size={30} color={'#659B0E'} />
              </View>
              <View style={styles.emailTextAndInput}>
                <Text style={styles.email}>Email</Text>
                <TextInput
                  style={styles.emailInput}
                  onChangeText={text => {
                    this.setState({ ...this.state, email: text });
                  }}
                />
              </View>
            </View>

            <View style={styles.passwordContainer}>
              <View style={styles.passwordIcon}>
                <Ionicons name="ios-lock" size={32} color={'#659B0E'} />
              </View>
              <View style={styles.emailTextAndInput}>
                <PasswordInputText
                  style={styles.passwordText}
                  value={this.state.password}
                  onChangeText={text => {
                    this.setState({ ...this.state, password: text });
                  }}
                  iconColor={'#659B0E'}
                  iconSize={24}
                  label={''}
                />

                <Text style={styles.password}>Password</Text>
              </View>
            </View>

            <View>
              <Button
                title="Login"
                onPress={this.handleLogin}
                color="#659B0E"
                titleStyle={{
                  color: 'white',
                  fontSize: 18,
                  lineHeight: 20,
                }}
                buttonStyle={{
                  backgroundColor: '#659B0E',
                  opacity: 1,
                  borderRadius: 20,
                  height: 40,
                  width: 150,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
            </View>

            <View>
              <Button
                title="Create an Account"
                onPress={() => this.props.navigation.push('Signup')}
                titleStyle={{
                  color: '#659B0E',
                  fontSize: 15,
                  lineHeight: 20,
                }}
                buttonStyle={{
                  backgroundColor: '#FFFFFF00',
                  opacity: 1,
                  borderRadius: 20,
                  height: 40,
                  width: 150,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#659B0E',
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: 350,
    height: 290,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  emailContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 330,
    height: 75,
    padding: 5,
    marginTop: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  emailIcon: {
    marginLeft: 20,
  },
  emailTextAndInput: {
    marginLeft: 20,
  },
  email: {
    fontFamily: 'avenir-book',
    marginTop: 10,
  },
  emailInput: {
    width: 250,
    fontFamily: 'avenir-book',
    fontSize: 17,
    paddingBottom: 4,
    borderBottomWidth: 0.45,
    borderColor: '#808080',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 330,
    height: 75,
    padding: 5,
    marginTop: 9,
    borderRadius: 20,
    alignItems: 'center',
  },
  passwordIcon: {
    marginLeft: 20,
  },
  password: {
    fontFamily: 'avenir-book',
    marginLeft: 5,
    marginBottom: 45,
  },
  passwordText: {
    marginTop: 10,
    marginLeft: 5,
    height: 20,
    width: 250,
    fontSize: 17,

    fontFamily: 'avenir-book',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => dispatch(login(email, password)),
});

const ConnectedLogin2 = connect(mapStateToProps, mapDispatchToProps)(Login2);
export default ConnectedLogin2;
