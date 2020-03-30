import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
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
    this.props.loginDispatch(this.state.email, this.statepassword);

    return this.navigation.navigate('UserHome');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <LoginScreen
            onPressLogin={this.handleLogin}
            usernameOnChangeText={text => {
              this.setState({ ...this.state, email: text });
            }}
            passwordOnChangeText={text => {
              this.setState({ ...this.state, password: text });
            }}
            loginButtonBackgroundColor="#a2a5a9"
            // logoComponent={your - logo - component}
            // IconComponent={your - icon - component}
            logoText={'Daily Dose'}
          />
          <Button
            title="Go to Signup"
            onPress={() => this.props.navigation.push('Signup')}
          />
        </ScrollView>
      </View>
    );
  }
}

// HomeScreen.navigationOptions = {
//   header: null,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
