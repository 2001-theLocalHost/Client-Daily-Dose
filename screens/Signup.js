import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import {Button} from 'react-native-elements'
import { signup } from '../store/user';
import CalendarModal from '../components/CalendarModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  convertHeight,
  validateInformation,
  dietaryArray,
} from '../utilityFunctions';
import PasswordInputText from 'react-native-hide-show-password-input';
import CheckBox from 'react-native-check-box';

class Signup extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      email: '',
      password: '',
      name: '',
      sex: '',
      birthdate: new Date(),
      feet: 0,
      inches: 0,
      weight: 0,
      glutenFree: false,
      dairyFree: false,
      vegan: false,
      vegetarian: false,
      lowCarb: false,
      lowFat: false,
      dateModalOpen: false,
      formattedDate: '',
      sexProps: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Prefer Not to Say', value: 'prefer-not-to-say' },
      ],
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.addDate = this.addDate.bind(this);
    this.showDateModal = this.showDateModal.bind(this);
    this.closeDateModal = this.closeDateModal.bind(this);
    this.formattedCalendarDate = this.formattedCalendarDate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  formattedCalendarDate() {
    const date = this.state.birthdate
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const string = month + '-' +  day+ '-' + year;
    this.setState({
      formattedDate: string
    })
  }

  async handleSignup() {
    let dietaryPreference = dietaryArray(this.state.glutenFree, this.state.dairyFree, this.state.vegan, this.state.vegetarian, this.state.lowCarb, this.state.lowFat)
  handleSignup() {
    let dietaryPreference = dietaryArray(
      this.state.glutenFree,
      this.state.dairyFree,
      this.state.vegan,
      this.state.vegetarian,
      this.state.lowCarb,
      this.state.lowFat
    );

    if (
      !validateInformation(
        this.state.email,
        this.state.password,
        this.state.name,
        this.state.sex,
        this.state.birthdate,
        this.state.feet,
        this.state.inches,
        this.state.weight
      )
    ) {
      return;
    }
    const { email, password, name, sex, birthdate, feet, inches } = this.state;
    const height = convertHeight(feet, inches);
    const weight = parseFloat(this.state.weight);
    let userInfo = {
      email,
      password,
      name,
      sex,
      dietaryPreference,
      birthdate,
      height,
      weight,
    };
    await this.props.signupDispatch(userInfo);
    if (this.props.error && this.props.error.response) {
      alert(`${this.props.error.response.data}`)
      return this.navigation.push('Login')
    }
    return this.navigation.push('Login');
  }

  handleCancel() {
    return this.navigation.push('FirstScreen');
  }

  addDate(date) {
    this.setState({
      birthdate: date,
    });
  }

  showDateModal() {
    this.setState({
      dateModalOpen: true,
    });
  }

  closeDateModal() {
    this.setState({
      dateModalOpen: false,
    });
    this.formattedCalendarDate()
  }

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.outerContainer}>
          <ImageBackground
            source={{
              uri:
                'https://www.heart.org/-/media/aha/h4gm/article-images/fruit-and-vegetables.jpg',
            }}
            style={styles.image}
          >
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Email:</Text>
                <TextInput
                  style={styles.text}
                  onChangeText={text => {
                    this.setState({ ...this.state, email: text });
                  }}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Password:</Text>
                <View style={styles.passwordContainer}>
                  <PasswordInputText
                    style={styles.passwordText}
                    value={this.state.password}
                    onChangeText={password => {
                      this.setState({ ...this.state, password: password });
                    }}
                  />
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Name:</Text>
                <TextInput
                  style={styles.text}
                  onChangeText={text => {
                    this.setState({ ...this.state, name: text });
                  }}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Date of Birth:</Text>
                <View>
                  {this.state.birthdate > new Date() ?
                  <Button
                    title="Select Date"
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                    }}
                    buttonStyle={{
                      backgroundColor: '#ADADAD',
                      opacity: .8,
                      borderRadius: 20,
                      height: 35,
                      width: 120,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginRight: 2.5
                    }}
                    onPress={this.showDateModal}
                    /> :
                  <View style={styles.dateContainer}>
                    <Text>{this.state.formattedDate}  </Text>
                    <Button
                      title="Edit"
                      titleStyle={{
                        color: 'white',
                        fontSize: 15,
                        lineHeight: 15,
                      }}
                      buttonStyle={{
                        backgroundColor: '#ADADAD',
                        opacity: .8,
                        borderRadius: 20,
                        height: 35,
                        width: 60,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginRight: 2.5
                      }}
                      onPress={this.showDateModal}
                      />
                  </View>}
                </View>
                <CalendarModal
                  addDate={this.addDate}
                  closeDateModal={this.closeDateModal}
                  isVisible={this.state.dateModalOpen}
                />
              </View>

              <View style={styles.sexContainer}>
                <Text style={styles.headerText}>Sex:</Text>
                <View>
                  <RadioForm formHorizontal={false} animation={true}>
                    {this.state.sexProps.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i}>
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={this.state.sex === obj.value}
                          onPress={value => {
                            this.setState({ sex: value });
                          }}
                          borderWidth={1}
                          buttonInnerColor={'#659B0E'}
                          buttonOuterColor={'black'}
                          buttonSize={7}
                          buttonOuterSize={17}
                          buttonStyle={{}}
                          buttonWrapStyle={{ marginLeft: 10 }}
                        />
                        <RadioButtonLabel
                          obj={obj}
                          index={i}
                          labelHorizontal={true}
                          onPress={value => {
                            this.setState({ sex: value });
                          }}
                          labelStyle={{ fontSize: 15, color: 'black' }}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    ))}
                  </RadioForm>
                </View>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Height:</Text>
                <TextInput
                  style={styles.textHeight}
                  onChangeText={text => {
                    this.setState({ ...this.state, feet: text });
                  }}
                />
                <Text>ft</Text>
                <TextInput
                  style={styles.textHeight}
                  onChangeText={text => {
                    this.setState({ ...this.state, inches: text });
                  }}
                />
                <Text>in</Text>
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.headerText}>Weight:</Text>
                <TextInput
                  style={styles.textHeight}
                  onChangeText={text => {
                    this.setState({ ...this.state, weight: text });
                  }}
                />
                <Text>lbs</Text>
              </View>

              <View style={styles.dietContainer}>
                <View style={styles.dietText}>
                  <Text style={styles.dietaryText}>Dietary</Text>
                  <Text style={styles.prefText}>Preference:</Text>
                </View>
                <View style={styles.checkboxContainer}>
                  <Text>Select All That Apply</Text>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.glutenFree ? this.setState({glutenFree: false}) : this.setState({glutenFree: true})}}
                  isChecked={this.state.glutenFree}
                  rightText={"Gluten-Free"}
                  rightTextStyle={styles.checkboxText}
                />
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.dairyFree ? this.setState({dairyFree: false}) : this.setState({dairyFree: true})}}
                  isChecked={this.state.dairyFree}
                  rightText={"Dairy-Free"}
                  rightTextStyle={styles.checkboxText}
                />
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.vegan ? this.setState({vegan: false}) : this.setState({vegan: true})}}
                  isChecked={this.state.vegan}
                  rightText={"Vegan"}
                  rightTextStyle={styles.checkboxText}
                />
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.vegetarian ? this.setState({vegetarian: false}) : this.setState({vegetarian: true})}}
                  isChecked={this.state.vegetarian}
                  rightText={"Vegetarian"}
                  rightTextStyle={styles.checkboxText}
                />
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.lowCarb ? this.setState({lowCarb: false}) : this.setState({lowCarb: true})}}
                  isChecked={this.state.lowCarb}
                  rightText={"Low-Carb"}
                  rightTextStyle={styles.checkboxText}
                />
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => {this.state.lowFat ? this.setState({lowFat: false}) : this.setState({lowFat: true})}}
                  isChecked={this.state.lowFat}
                  rightText={"Low-Fat"}
                  rightTextStyle={styles.checkboxText}
                />
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <View style={styles.signupButton}>
                  <Button
                    onPress={this.handleSignup}
                    title="Sign Up"
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                    }}
                    buttonStyle={{
                      backgroundColor: '#659B0E',
                      opacity: .8,
                      borderRadius: 20,
                      height: 35,
                      width: 75,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginRight: 2.5
                    }}
                  />
                </View>
                <View style={styles.signupButton}>
                  <Button
                    onPress={this.handleCancel}
                    title="Cancel"
                    titleStyle={{
                      color: 'white',
                      fontSize: 15,
                      lineHeight: 15,
                    }}
                    buttonStyle={{
                      backgroundColor: '#FF7F4B',
                      opacity: .8,
                      borderRadius: 20,
                      height: 35,
                      width: 75,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginLeft: 2.5,
                    }}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#659B0E',
    justifyContent: 'center',
    alignItems: 'center',
    height: 900,
    opacity: 0.8,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 1,
    height: 850,
    width: 350,
    borderRadius: 10,
    marginTop: 25,
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  checkboxText: {
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 400,
    flexBasis: 'auto'
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    width: 300,
    backgroundColor: 'orange',
    borderRadius: 10,
    opacity: 1,
    flexDirection: 'row',
    margin: 7,
  },
  dietText: {
    flexDirection: 'column',
  },
  sexContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    width: 300,
    backgroundColor: 'orange',
    borderRadius: 10,
    opacity: 1,
    flexDirection: 'row',
    margin: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dietContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 190,
    width: 300,
    backgroundColor: 'orange',
    borderRadius: 10,
    opacity: 1,
    flexDirection: 'row',
    margin: 10,
  },
  headerText: {
    fontWeight: 'bold',
    padding: 10,
  },
  dietaryText: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },
  prefText: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  text: {
    width: 180,
    opacity: 0.8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center',
  },
  passwordContainer: {
    width: 180,
    height: 35,
    opacity: 0.8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  passwordText: {
    marginBottom: 20,
    marginLeft: 5,
    color: 'black',
    margin: 0,
    width: 170,
  },
  textHeight: {
    width: 50,
    opacity: 0.8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
});

const mapStateToProps = state => ({
  user: state.user,
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  signupDispatch: userInfo => dispatch(signup(userInfo)),
});

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default ConnectedSignup;
