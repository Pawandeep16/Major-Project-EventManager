import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Input, Button, ThemeConsumer } from 'react-native-elements';
import EncryptedStorage from 'react-native-encrypted-storage';
import postRequest from '../Axios/postRequest'
import axios from '../Axios/axios'
import { Colors } from '../../Helper/Colors';
import { TextInput } from 'react-native-paper';
export default class LoginScreen extends Component {
  // url = "http://192.168.1.6:8000/api/notify/login";
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = {
      email: "",
      password: "",
      loading: false,
      pin: null,
      toggle: false
    };

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
    // console.log({ data })
  }

  showLoading = (flag) => {
    this.setState({ loading: flag });
  }
  send = async () => {
    if (this.state.email != null && this.state.password != null) {
      let body =
      {
        email: this.state.email,
        password: this.state.password,
      }
      axios.post('/notify/login', body)
        .then((res) => {
          console.log(res.data)
          if (res.data.status) 
          {
            this.store(res.data.status, 'student', res.data.user.id)
            this.showLoading(true)
            this.navigation.replace("Welcome", { role: 'student' })
          }
          else {
            alert(res.data.error)
          }
        })
        .catch((err) => {
          alert(err);
        })
    }
    else {
      alert('InvalidCredentials')
    }

  }
  toggle = () => {
    let toggle = this.state.toggle
    if (toggle) {
      this.setState({ toggle: true })
      this.check()
    }
    else {
      this.setState({ toggle: true })
    }
  }

  check = async () => {
    if (this.state.pin == '2908') {
      this.navigation.navigate('TecherRegister')
    }
    else 
    {
      let body =
      {
        teacherPin: this.state.pin
      }
      await axios.post('/teacher/list', body)
        .then((res) => {
          console.log(res.data)
          if (res.data.status) {
            this.navigation.replace("Welcome", { role: "admin" })
            this.store(res.data.status, 'admin', res.data.data.id)
          }
          else {
            alert(res.data.errors)
          }
        }).catch(err => console.log(err))
    }
  }
  render() {
    return (
      <ImageBackground
        source={require('../Assests/baseScreen2.png')}
        style={styles.container}>
        <View style={styles.textFeild}>
          <Text style={{ fontSize: 28, color: Colors.btn, fontFamily: 'monospace' }}>Welcome,</Text>
        </View>
        <View style={styles.pinput}>
          <TextInput
            label="Email"
            autoFocus={true}
            right={<TextInput.Icon name="email" />}
            style={styles.input}
            underlineColor='transparent'
            onChangeText={(e) => this.setState({ email: e })}
            selectionColor={Colors.btn}
            activeOutlineColor={Colors.btn}
            dense={true}
          />
        </View>

        <View style={styles.pinput}>
          <TextInput
            label="Password"
            right={<TextInput.Icon name="lock" />}
            style={styles.input}
            secureTextEntry
            underlineColor='transparent'
            onChangeText={(e) => this.setState({ password: e })}
            selectionColor={Colors.btn}
            activeOutlineColor={Colors.btn}
            dense={true}
          />
        </View>

        <TouchableOpacity
          style={styles.button2}
          onPress={this.send}>
          {
            this.state.loading ?
              <ActivityIndicator size="large" color="#eee" />
              :
              <Text style={styles.text}>LogIn</Text>
          }
        </TouchableOpacity>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>OR</Text>
        </View>
        {/* //Teacher pin Login */}

        {this.state.toggle ?
            <View style={styles.pinput}>
              <TextInput
                label="Enter The PIN"
                autoFocus={true}
                secureTextEntry
                maxLength={4}
                right={<TextInput.Icon name="lock" />}
                style={styles.input}
                underlineColor='transparent'
                onChangeText={(e) => this.setState({ pin: e })}
                selectionColor={Colors.btn}
                activeOutlineColor={Colors.btn}
                dense={true}
              />
            </View>
          : null
        }

        <TouchableOpacity
          style={styles.button2}
          onPress={this.toggle}>
          {
            this.state.loading ?
              <ActivityIndicator size="large" color="#eee" />
              :
              <Text style={styles.text}>Login Using PIN</Text>
          }

          {/* TEacher Pin login End here */}
        </TouchableOpacity>

        <View style={styles.textpart}>
          <Text style={{ color: Colors.drawer, fontSize: 17,}}>
            Don't Have an Account?
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.navigation.navigate('SignUp');
            }}>
            <Text style={{fontSize:17,color:Colors.btn}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  textpart: {
    marginTop: 10,
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding:3
  },
  button2: {
    height: 50,
    width: '80%',
    backgroundColor: Colors.btn,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    padding: 5,
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFF',
  },
  input: {
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 30,
    padding: 4,
    borderRadius: 5
  },
  pinput: {
    width: '80%',
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textFeild:
  {
    width: '80%',
    height: 40,
  }
});
