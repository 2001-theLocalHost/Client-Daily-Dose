import * as React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import LoginScreen from 'react-native-login-screen';
import { login } from '../store/user';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    // this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // }

  handleLogin() {
    console.log(
      'saving username and password',
      this.state.email,
      this.state.password
    );
    this.props.loginDispatch(this.state.email, this.statepassword);
    //need to update the URI for the axios post request /auth/login
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
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

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
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  loginDispatch: (email, password) => dispatch(login(email, password)),
});

const ConnectedHomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
export default ConnectedHomeScreen;
