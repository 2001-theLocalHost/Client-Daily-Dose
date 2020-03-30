import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from 'react-native';

export default class FirstScreen extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {};
    this.navigation = navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.navigation.push('Login')}
          title="Login"
          color="green"
        />
        <Button
          onPress={() => this.navigation.push('Signup')}
          title="Sign Up"
          color="green"
        />
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
});
