import axios from '../../Axios/axios';
import React, { Component } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../../Helper/Loading';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const date = new Date();
export default class Home extends Component {
  currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
  notfound = 'No Notice Found'
  data = []
  constructor(props) {
    super(props);
    this.state =
    {
      isLoading: true,
      id: '',
      curTime: '',
      curDate: '',
      curLec: 'No Lecture'
    }
    this.getNotice()
  }
  componentDidMount() 
  {
    this.intervalID = setInterval(
      () =>this.tick(),
      1000
    );
  }
  componentWillUnmount() 
  {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      curDate: new Date().toDateString(),
      curTime: new Date().toLocaleTimeString()
    })
  }
  getNotice = async () => {
    let body =
    {
      posted_on: this.currentDate
    }
    console.log(this.currentDate)
    await axios.post('/notice/getNotice', body)
      .then((res) => {
        if (res.data.status) 
        {
          this.data=res.data.data
          this.setState({ isLoading: false })
        }
        else 
        {
          // this.setState({ isLoading: false })
        }
      })
      .catch((err) => console.log(err))
  }
  getLec = async () => {
    let data =
    {
      time: this.state.curTime
    }
    axios.post('/timetable/getList', data)
      .then((res) => {
        if (res.data.status) {
          this.setState({ curLec: res.data.data.subject ,isLoading:false})
        }
        else {
          this.setState({ curLec: res.data.message ,isLoading: false})
        }
      })
      .catch((err) => console.log({ err }))
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? <Loading /> :
          <>
            <Text style={styles.textdesign}>Current Lecture</Text>
            <View style={styles.topsec}>
              <Text>{this.state.curDate}</Text>
              <Text>Time:-{this.state.curTime}</Text>
              <Text>Current Lecture{this.state.curLec}</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <Text style={styles.textdesign}>
                <Icon name="alert" style={{ fontWeight: 'bold', fontSize: 50 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 10 }}>
                    Notice Board
                  </Text>
                </Icon>
              </Text>
            </View>

            <View style={styles.topsec}>
            <ScrollView>
              {this.data.length != 0 ?
                this.data.map((item) =>
               
                  <Card key={item.id} style={styles.card}>
                    
                   
                      <Card.Title style={styles.header} title={item.posted_by}/>
                 
                    
                     
                      <Card.Content > 
                      <Title>Description</Title>
      <Paragraph>{item.detail}</Paragraph>
                      </Card.Content>
                   
                    <View style={styles.noticecont}>
                      <Text style={styles.header}>Date:{item.posted_on}</Text>
                    </View>
                  </Card>
                 
                )
                :
                <Text style={{ fontSize: 18 }}>{this.notfound}</Text>
              }
              </ScrollView>
            </View>
           
          </>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  topsec: {
    overflow: 'hidden',
    width: 300,
    height: 200,
    borderWidth: 2,
    fontSize: 50,
    color: '#2B8BEB',
    borderRadius: 10,
    borderColor: '#2B8BEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textdesign: {
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: 70,
    color: '#2B8BEB',
  },
  bottomcont: {
    
    padding:20,
    justifyContent: 'center',
    alignItems: "flex-start",
  },
card:{
  width:"80",
  justifyContent: 'center',
  alignItems: "center",
}
});
