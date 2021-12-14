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

const Stack = createNativeStackNavigator();
export default class App extends Component {
  navigation = '';
  constructor(props) 
  {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      user: false,
    };
  }
  render() {
    return (
      <View style={styles.cont}>
        <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle='dark-content'
          animated={true}
        />
          <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
            />
            <Stack.Screen
              name="LogIn"
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              component={StudentRegister}
            />
            <Stack.Screen
              name="TecherRegister"
              component={TeacherRegister}
            />
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
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
