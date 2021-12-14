import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Input} from 'react-native-elements';
import axios from '../Axios/axios';
import { SafeAreaView } from 'react-native-safe-area-context';
export default class StudentRegister extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state =
    {
      email: "",
      password: "",
      name: "",
      mobile_phone: "",
      sem: "",
      shift: "",
      confirmPassword: "",
    }
  }
  check = () => {
    if (this.state.confirmPassword == this.state.password) {
      this.send()
    }
    else 
    {
      alert("Please enter same Password");
    }
  }

  store = async (flag, role, id) => {
    let data =
    {
      user: flag,
      user_id: id,
      role: role
    }
    await EncryptedStorage.setItem(
      "user", JSON.stringify(data)
    );
  }

  send = async () => {
    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      mobile_phone: this.state.mobile_phone,
      sem: this.state.sem,
      shift: this.state.shift,

    }
    await axios.post('/notify/signUp', data)
      .then((res) => {
        console.log(res.data)
        if (res.data.status) 
        {
          this.store(res.data.status, 'student', res.data.user.id);
          this.navigation.replace("Welcome");
        }
        else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <ImageBackground
        source={require('../Assests/newone.jpg')}
        style={{ flex: 1, justifyContent: 'space-between' }}
      >
        <View style={{ flex: 1 }}>

        </View>
        <SafeAreaView style={{ alignItems: 'center', flex: 4, justifyContent: 'center' }}>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              placeholder="Enter Your Name"
              focusable={true}
              type="text"
              onChangeText={(e) => this.setState({ name: e })}
              leftIcon={{ type: 'font-awesome', name: 'user', color: '#3c6e57' }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              placeholder="Enter Mobile Phone Number"
              focusable={true}
              maxLength={10}
              type="text"
              onChangeText={(e) => this.setState({ mobile_phone: e })}
              leftIcon={{
                type: 'font-awesome',
                name: 'phone',
                color: '#3c6e57',
              }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              placeholder="Enter Shift"
              focusable={true}
              type="text"
              onChangeText={(e) => this.setState({ shift: e })}
              leftIcon={{
                type: 'font-awesome',
                name: 'building',
                color: '#3c6e57',
              }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              placeholder="Enter Semester"
              focusable={true}
              type="text"
              onChangeText={(e) => this.setState({ sem: e })}
              leftIcon={{
                type: 'font-awesome',
                name: 'building',
                color: '#3c6e57',
              }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              underlineColorAndroid="transparent"
              placeholder="Email"
              type="email"
              onChangeText={(e) => this.setState({ email: e })}
              leftIcon={{
                type: 'font-awesome',
                name: 'envelope',
                color: '#3c6e57',
              }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              placeholderTextColor="#3c6e57"
              underlineColorAndroid="transparent"
              placeholder="Password"
              secureTextEntry={true}
              type="password"
              onChangeText={(e) => this.setState({ password: e })}
              leftIcon={{ type: 'font-awesome', name: 'lock', color: '#3c6e57' }}
            />
          </View>
          <View style={styles.pinput}>
            <Input
              underlineColorAndroid="transparent"
              placeholderTextColor="#3c6e57"
              placeholder="Confirm Password"
              secureTextEntry={true}
              type="password"
              onChangeText={(e) => this.setState({ confirmPassword: e })}
              leftIcon={{ type: 'font-awesome', name: 'key', color: '#3c6e57' }}
            />
          </View>
          <TouchableOpacity
            style={styles.buttons}
            onPress={this.check}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </SafeAreaView>

      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },


  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#3c6e57',
    width: '80%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',

  },
  pinput: {
    borderColor: '#3c6e57',
    borderWidth: 1,
    width: "80%",
    height: 50,
    margin: 4,
    borderRadius: 5,
  },

});
