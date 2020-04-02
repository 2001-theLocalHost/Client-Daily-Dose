import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logout } from '../store/user';
import { capitalize } from '../utilityFunctions';

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async () => {
    this.props.logoutDispatch();
  };

  render() {
    console.log('this is user', this.props.user);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/fruits-purplegreen.png')}
          style={styles.image}
        >
          <View style={styles.userContainer}>
            <Text style={styles.header}>Welcome, {this.props.user.name}!</Text>
            <View style={styles.textContainer}>
              <Text style={styles.subHeader}>
                Sex: {capitalize(this.props.user.sex)}
              </Text>
              <Text style={styles.subHeader}>
                Birthday: {this.props.user.birthdate}
              </Text>
              <Text style={styles.subHeader}>
                Height: {Math.round(this.props.user.height / 12)} ft{' '}
                {this.props.user.height % 12} in
              </Text>
              <Text style={styles.subHeader}>
                Weight: {this.props.user.weight} lbs
              </Text>
              <Text style={styles.subHeader}>Dietary Preference: </Text>
              {this.props.user.dietaryPreference.map(el => {
                <Text>-{el}</Text>;
              })}
            </View>

            <View>
              <Button
                title="LOGOUT"
                onPress={this.handleLogout}
                color="#659B0E"
                titleStyle={{
                  color: 'white',
                  fontSize: 15,
                  lineHeight: 15,
                }}
                buttonStyle={{
                  backgroundColor: '#FF7F4B',
                  opacity: 1,
                  borderRadius: 20,
                  height: 35,
                  width: 190,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 10,
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  userContainer: {
    backgroundColor: 'white',
    opacity: 0.85,
    width: 280,
    height: 430,
    marginTop: 40,
    alignItems: 'center',
    borderRadius: 30,
  },
  header: {
    fontFamily: 'avenir-book',
    fontSize: 30,
    marginTop: 50,
    padding: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontFamily: 'avenir-book',
  },
  textContainer: {
    width: 220,
    height: 230,
    justifyContent: 'center',
    padding: 20,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => dispatch(logout()),
});

const ConnectedHomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
export default ConnectedHomeScreen;
