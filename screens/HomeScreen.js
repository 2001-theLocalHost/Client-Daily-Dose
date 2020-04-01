import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../store/user';
import { StackActions, CommonActions } from '@react-navigation/native';

class HomeScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {};
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logoutDispatch();
    return this.props.navigation.reset({
      routes: [{ name: 'FirstScreen' }],
    });
    this.props.navigation.dispatch(navigateAction)
  }

//   import { NavigationActions } from 'react-navigation';

// const navigateAction = NavigationActions.navigate({
//   routeName: 'Profile',

//   params: {},

//   action: NavigationActions.navigate({ routeName: 'FirstScreen' }),
// });

// const navigateAction = NavigationActions.navigate({
//   routeName: 'Profile',

//   params: {},

//   action: NavigationActions.navigate({ routes: [{name: 'FirstScreen'}] }),
// });

// import { NavigationActions } from 'react-navigation';

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: 'Profile' })],
// });
// this.props.navigation.dispatch(resetAction);


// this.props.navigation.dispatch(navigateAction);

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>Welcome, {this.props.user.name}!</Text>
          <Button title="Logout" onPress={this.handleLogout} />
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
  contentContainer: {
    paddingTop: 30,
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
