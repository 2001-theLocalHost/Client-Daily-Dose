import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from 'react-native-login-screen';
import { login } from '../store/user';

class Login extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.loginDispatch(this.state.email, this.state.password);

    return this.navigation.dispatch(StackActions.popToTop());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <LoginScreen
            source={{
              uri:
                'https://www.heart.org/-/media/aha/h4gm/article-images/fruit-and-vegetables.jpg',
            }}
            onPressLogin={this.handleLogin}
            usernameOnChangeText={text => {
              this.setState({ ...this.state, email: text });
            }}
            passwordOnChangeText={text => {
              this.setState({ ...this.state, password: text });
            }}
            loginButtonBackgroundColor="#659B0E"
            loginButtonTextStyle={styles.loginFont}
            switchTextStyle={styles.switchFont}
            logoComponent={<MaterialCommunityIcons size={1} />}
            logoText={''}
            usernameIconComponent={
              <Ionicons name="md-person" size={30} color={'#659B0E'} />
            }
            passwordIconComponent={
              <Ionicons name="ios-lock" size={32} color={'#659B0E'} />
            }
            disableSettings={true}
            disableSwitch={true}
          />
          <Button
            title="Go to Signup"
            onPress={() => this.props.navigation.push('Signup')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginFont: {
    fontFamily: 'avenir-book',
    color: 'white',
  },
  switchFont: {
    fontFamily: 'avenir-book',
    color: '#3E3D3F',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => dispatch(login(email, password)),
});

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export default ConnectedLogin;
