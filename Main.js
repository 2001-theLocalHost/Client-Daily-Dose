import * as React from 'react';
import { connect } from 'react-redux';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IngredientConfirmation from './screens/IngredientConfirmation'
import { me } from './store/user';
import AuthStackScreen from './navigation/AuthNavigator';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Root = createStackNavigator();

function Main(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        props.loadUserInfo();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialCommunityIcons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    const loggedIn = props.isLoggedIn;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Root.Navigator>
            {loggedIn ? (
              <>
              <Root.Screen name="App" component={BottomTabNavigator} />
              <Root.Screen name='confirmation' component={IngredientConfirmation} />
              </>
            ) : (
              <Root.Screen name="Auth" component={AuthStackScreen} />
            )}
          </Root.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = state => ({
  isLoggedIn: !!state.user.id, //boolean value true if state.user.id exists
});

const mapDispatchToProps = dispatch => ({
  loadUserInfo: () => dispatch(me()), //sets state with req.user created only with req.login
});

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
export default ConnectedMain;
