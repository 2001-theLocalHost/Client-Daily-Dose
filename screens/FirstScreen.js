import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ImageBackground,
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
        <ImageBackground
          source={{
            uri:
              'https://www.heart.org/-/media/aha/h4gm/article-images/fruit-and-vegetables.jpg',
          }}
          style={styles.image}
        >
          <View style={styles.textandButtonContainers}>
            <View style={styles.textContainer}>
              <Text style={styles.headText}>Welcome to</Text>
              <Text style={styles.text}>Daily Dose</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => this.navigation.push('Login')}
                title="LOGIN"
                color="white"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => this.navigation.push('Signup')}
                title="SIGN UP"
                color="white"
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
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  textandButtonContainers: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    opacity: 0.7,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    backgroundColor: '#FF7F4B',
    width: 200,
    opacity: 0.9,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headText: {
    fontSize: 30,
    color: '#3E3D3F',
    fontFamily: 'avenir-book',
  },
  text: {
    marginTop: -15,
    marginBottom: 5,
    fontSize: 50,
    color: '#3E3D3F',
    fontFamily: 'avenir-book',
  },
});
