import React, { Component } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Loading from '../../Helper/Loading';
export default class SplashScreen extends Component {
  navigation = ""
  constructor(props) {
    super(props);
    this.navigation = props.navigation
    this.state = {
      user: false
    }
    this.check()
  }
  check = async () => {
    let userData = await EncryptedStorage.getItem("user")
    if (userData != null) {
      let data = JSON.parse(userData)
      this.setState({ user: data.user })
      this.navigation.replace("Welcome",{data:data})
    }
    else {
      this.navigation.replace("LogIn");
    }
  }
  render() {
    return (
      // <View>
      //   <LottieView source={require('../Assests/LottieAnimations/alarm.json')} autoPlay loop/>
      // // </View>
       <View style={styles.cont}>
        <View style={styles.imgCont}>
        <Loading page='splash'/>
        </View>
        <View style={styles.textCont}>
          <Text style={styles.text}>NOTIFY</Text>
          <Text style={{ color: '#aaa', fontSize: 10, }}>@Copyrigth 2021</Text>
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
  },
  imgCont: {
    width:'100%', 
    height:'80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignContent: 'flex-end',
    fontSize: 23,
    letterSpacing: 7,
    color: '#aaa',
    fontWeight: 'bold',
  },
});
