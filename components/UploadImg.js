import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { finalizeIngredients } from '../store/dishes';

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '51299dbad48e410fbf0107a0b261fa24'});

class UploadImg extends React.Component {
  state = {
    image: null, 
    photo: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  submitImage = () => {
    console.log('submitting', this.state.image)
    
    app.models.predict("bd367be194cf45149e75f01d59f77ba7", this.state.image).then(
    function(response) {
      console.log(response)
    },
    function(err) {
      console.log('there was an error', err)
    }
  );
  }

  render() {
    let { image } = this.state;
    // console.log('image?', image)

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.getStartedText}>
          Let's start analyzing!
         </Text>
        
        {image == null ? (
          <View style={styles.uploadButtons}>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._pickImage}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          </View>
        ): (
          <View>
            <View style={styles.uploadButtons}>
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            <TouchableOpacity
            style={styles.button}
            onPress={this.submitImage}
            >
            <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
          
          <View style={styles.uploadButtonsagain}>
          <TouchableOpacity
            onPress={this.takePicture}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._pickImage}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          </View>
            </View>
        )}
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
  }

  getCameraPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.cancelled) {
      console.log(result)
      this.setState({ image: result.uri });
    }
  };

  takePicture = async () => {
    try {
     await this.getCameraPermissionAsync()
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
        quality: 1,
        base64: true,
        allowsEditing: true,
        allowsMultipleSelection: true,
      })
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
    catch (error) {
      console.log(error)
    }
  }
}

const mapDispatch = dispatch => ({
  finalizeIngredients: ingredients => {
    dispatch(finalizeIngredients(ingredients));
  }
});

export default connect(null, mapDispatch)(UploadImg)

const styles = StyleSheet.create({
  uploadButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  uploadButtonsagain: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  getStartedText: {
    fontSize: 22,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#659B0E',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

