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
    // return this.props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: 'Auth' }],
    //   })
    // );
  }

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
