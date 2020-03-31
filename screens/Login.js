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
    console.log(
      'saving username and password',
      this.state.email,
      this.state.password
    );
    this.props.loginDispatch(this.state.email, this.state.password);

    return this.navigation.dispatch(StackActions.popToTop());
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <LoginScreen
            // source={require('../assets/images/grain.png')}
            //'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2F2016%2F03%2Fmain%2Foh4637p21-know-your-grains.jpg%3Fitok%3DZ2qx5R6X',
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
    fontFamily: 'gotham-book',
    color: 'white',
  },
  switchFont: {
    fontFamily: 'gotham-book',
    color: 'white',
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
