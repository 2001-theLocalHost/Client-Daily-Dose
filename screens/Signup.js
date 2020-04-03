import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { signup } from '../store/user';
import CalendarModal from '../components/CalendarModal';
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
  }

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
    this.props.signupDispatch(userInfo);
    return this.navigation.push('Login');
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
  }

  render() {
    return (
      <ScrollView>
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
                  <Button title="Select Date" onPress={this.showDateModal} />
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
                    onClick={() => {
                      this.state.glutenFree
                        ? this.setState({ glutenFree: false })
                        : this.setState({ glutenFree: true });
                    }}
                    isChecked={this.state.glutenFree}
                    rightText={'Gluten-Free'}
                    rightTextStyle={styles.checkboxText}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                      this.state.dairyFree
                        ? this.setState({ dairyFree: false })
                        : this.setState({ dairyFree: true });
                    }}
                    isChecked={this.state.dairyFree}
                    rightText={'Dairy-Free'}
                    rightTextStyle={styles.checkboxText}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                      this.state.vegan
                        ? this.setState({ vegan: false })
                        : this.setState({ vegan: true });
                    }}
                    isChecked={this.state.vegan}
                    rightText={'Vegan'}
                    rightTextStyle={styles.checkboxText}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                      this.state.vegetarian
                        ? this.setState({ vegetarian: false })
                        : this.setState({ vegetarian: true });
                    }}
                    isChecked={this.state.vegetarian}
                    rightText={'Vegetarian'}
                    rightTextStyle={styles.checkboxText}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                      this.state.lowCarb
                        ? this.setState({ lowCarb: false })
                        : this.setState({ lowCarb: true });
                    }}
                    isChecked={this.state.lowCarb}
                    rightText={'Low-Carb'}
                    rightTextStyle={styles.checkboxText}
                  />
                  <CheckBox
                    style={styles.checkbox}
                    onClick={() => {
                      this.state.lowFat
                        ? this.setState({ lowFat: false })
                        : this.setState({ lowFat: true });
                    }}
                    isChecked={this.state.lowFat}
                    rightText={'Low-Fat'}
                    rightTextStyle={styles.checkboxText}
                  />
                </View>
                {/* <View>
                  <RadioForm formHorizontal={false} animation={true}>
                    {this.state.healthProps.map((obj, i) => (
                      <RadioButton labelHorizontal={true} key={i}>
                        <RadioButtonInput
                          obj={obj}
                          index={i}
                          isSelected={this.state.dietaryPreference.includes(
                            obj.value
                          )}
                          onPress={
                            !this.state.dietaryPreference.includes(obj.value)
                              ? value => {
                                  this.setState({
                                    ...this.state,
                                    dietaryPreference: [
                                      ...this.state.dietaryPreference,
                                      obj.value,
                                    ],
                                  });
                                }
                              : value => this.removeDietaryPreference(value)
                          }
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
                            this.setState({
                              ...this.state,
                              dietaryPreference: [
                                ...this.state.dietaryPreference,
                                obj.value,
                              ],
                            });
                          }}
                          labelStyle={{ fontSize: 15, color: 'black' }}
                          labelWrapStyle={{}}
                        />
                      </RadioButton>
                    ))}
                  </RadioForm>
                </View> */}
              </View>

              <View style={styles.signupButton}>
                <Button
                  onPress={this.handleSignup}
                  title="Sign Up"
                  color="green"
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
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
    marginTop: 30,
  },
  checkbox: {},
  checkboxText: {
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 400,
    // flexGrow: 2
    flexBasis: 'auto',
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
    margin: 10,
  },
  dietText: {
    flexDirection: 'column',
    // flexGrow: 1
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
});

const mapDispatchToProps = dispatch => ({
  signupDispatch: userInfo => dispatch(signup(userInfo)),
});

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default ConnectedSignup;
