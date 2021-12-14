import axios from '../../Axios/axios';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../../Helper/Colors';
import days from "../../../Helper/Days";

const date = new Date()
export default class Stime extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      day: 0
    }
    this.getData()
  }
  // componentDidUpdate(){
  //   this.getData()
  // }
  getData = async () => {
    let data = {
      day: this.state.day
    }
    axios.post('/timetable/getList', data)
      .then((res) => {
        // console.log(res.data)
      })
      .catch((err) => console.log(err))
  }
  toggle=(flag) => {
    this.setState({day:flag})
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.tabView}>
          {/* {days.map(item =>
            <TouchableOpacity style={styles.btn} key={item.id} onPress={this.toggle(item.id)}>
              <Text style={{ color: 'white' }}>{item.day}</Text>
            </TouchableOpacity>
          )} */}
        </View>
        <Table />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tabView: {
    position: 'absolute',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: 0
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.btn,
    padding: 20,
    elevation: 5
  }
});