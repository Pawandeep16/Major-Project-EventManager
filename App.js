import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Components/screens/WelcomeScreen';
import SplashScreen from './Components/screens/SplashScreen';
import LoginScreen from './Components/screens/LoginScreen';
import { StatusBar } from 'react-native';
import StudentRegister from './Components/screens/StudentRegister';
import TeacherRegister from './Components/screens/TecherRegister';
import PushNotification from 'react-native-push-notification';
import MessengerScreen from './Components/screens/MessengerScreen';

const Stack = createNativeStackNavigator();

var myrouter = null

const setTopLevelNavigator = (_router_el) => {
  myrouter = _router_el;
}

PushNotification.configure({
  onNotification: function (notification) {
    const { data } = notification
    console.log(data)
    if (myrouter) {
      myrouter.navigate("Welcome")
    } else {
      setTimeout(() => {
        if (myrouter) {
          myrouter.navigate("Welcome")
        }
      }, 1000)
    }
  }
});
export default class App extends Component {
  navigation = '';
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      user: false,
    };
  }
  render() {
    return (
      <View style={styles.cont}>
        <NavigationContainer
          ref={(navigatorRef) => { setTopLevelNavigator(navigatorRef) }}>
          <StatusBar
            backgroundColor="transparent"
            translucent={true}
            barStyle='dark-content'
            animated={true}
          />
          <Stack.Navigator>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="LogIn"
              component={LoginScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="SignUp"
              component={StudentRegister}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="TecherRegister"
              component={TeacherRegister}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown:false}}
            />
            <Stack.Screen
              name="Messenger"
              component={MessengerScreen}
              options={({ route }) => ({ title: route.params.user.name })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
});
