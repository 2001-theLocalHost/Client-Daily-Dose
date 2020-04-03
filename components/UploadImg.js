import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { depositClarifaiData } from '../store/dishes';

const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: '51299dbad48e410fbf0107a0b261fa24' });

class UploadImg extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      imageB64: null,
      imageUri: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  submitImage = () => {
    app.models
      .predict('bd367be194cf45149e75f01d59f77ba7', {
        base64: this.state.imageB64,
      })
      .then(
        response => {
          let foodArr = response.outputs[0].data.concepts;
          this.depositData(foodArr, this.state.imageUri);
          this.refreshScreen();
        },
        function(err) {
          console.log('there was an error', err);
        }
      );
  };

  async depositData(data, uri) {
    await this.props.depositClarifaiData(uri);
    return this.navigation.navigate('Confirmation', { data });
  }

  refreshScreen() {
    this.setState({ imageB64: null, imageUri: null });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <ImageBackground
          source={require('../assets/images/green.png')}
          style={styles.image}
        >
        <Text style={styles.getStartedText}>Let's start analyzing!</Text>

        {this.state.imageUri === null ? (
          <View style={styles.uploadButtons}>
            <TouchableOpacity onPress={this.takePicture} style={styles.button}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImage} style={styles.button}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.uploadButtons}>
              <Image
                source={{ uri: this.state.imageUri }}
                // style={{ width: 200, height: 200 }}
                style={styles.dishimage}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={this.submitImage}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        </ImageBackground>
      </View>
    );
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  getCameraPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({ imageB64: result.base64, imageUri: result.uri });
    }
  };

  takePicture = async () => {
    try {
      await this.getCameraPermissionAsync();
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        quality: 1,
        base64: true,
        allowsEditing: true,
        allowsMultipleSelection: true,
      });
      if (!result.cancelled) {
        this.setState({ imageB64: result.base64, imageUri: result.uri });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

const mapDispatch = dispatch => ({
  depositClarifaiData: (data, uri) => {
    dispatch(depositClarifaiData(data, uri));
  },
});

export default connect(null, mapDispatch)(UploadImg);

const styles = StyleSheet.create({
  uploadButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  uploadButtonsagain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  getStartedText: {
    fontSize: 22,
    color: 'black',
    lineHeight: 45,
    textAlign: 'center',
    fontFamily: 'Avenir-Book',
    fontWeight: 'bold',
    backgroundColor: 'white',
    opacity: 0.80,
    width: 250,
    height: 45,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: '#FF7F4B', 
    padding: 20,
    margin: 10,
    borderRadius: 10,
    fontFamily: 'Avenir-Book',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Avenir-Book',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
    
  },
  dishimage: {
    marginTop: 17,
    width: 250, 
    height: 250,
    borderRadius: 5,
    overflow: 'hidden',
    borderRadius: 8,
  },
});

