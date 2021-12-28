import axios from '../../Axios/axios';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LatestEvent from '../../LatestEvent';
import AllEvents from '../../AllEvents';
import { Colors } from '../../../Helper/Colors';
export default class Events extends Component {
  props=null
  constructor(props) {
    super(props)
    this.props=props
    this.state = {
      active:0
    }
  }

  refresh=()=> {
    this.props.navigation.replace('Events')
  }
  render() 
  {
    return (
      <View style={styles.container}>
        <View style={styles.buttonView}>
          <TouchableOpacity style={this.state.active==0?styles.activeBtn:styles.btn} onPress={()=>this.setState({active:0})}>
            <Text style={this.state.active==0?styles.btnText2:styles.btnText}>Latest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.state.active==1?styles.activeBtn:styles.btn} onPress={()=>this.setState({active:1})}>
            <Text style={this.state.active==1?styles.btnText2:styles.btnText}>All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomView}>
          <Text style={styles.top}>
          {this.state.active==0?'Latest Events': 'All Events'}</Text>
          {this.state.active===0?
          <LatestEvent />
          :
          <AllEvents/>
          }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
  textdesign: {
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 30,
    color: '#2B8BEB',
    marginRight: 70,
  },
  topsec: {
    width: 300,
    height: 200,
    borderWidth: 2,
    fontSize: 20,
    color: '#2B8BEB',
    borderRadius: 10,
    borderColor: '#2B8BEB',
  },
  top: {
    fontWeight: 'bold',
    color: '#2C394B',
    fontSize: 20,
    letterSpacing:4,
    paddingBottom:30
  },
  buttonView: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin:20,
   
  },
  btn: {
    width: 150,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    backgroundColor: '#fff',
    elevation:5

  },
  activeBtn:{
    color:"#fff",
    width: 150,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    elevation:5,
    backgroundColor: Colors.btn

  },
  btnText: {
    color: '#00AF91',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
  btnText2:{
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
    textTransform: 'uppercase', 
    opacity:0.8
  },
  bottomView: {
    flex: 5,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardView: {
    width: '90%',
    height: 450,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },

});
