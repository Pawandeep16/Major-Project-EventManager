import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import Loading from '../Helper/Loading';
import axios from './Axios/axios';
import ListEvents from './ListEvents';
export default class LatestEvent extends Component {
    data = []
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
        this.getData()
    }
    componentDidMount() {
        this.intervalID = setInterval(
          () =>this.getData(),
          1000
        );
      }
      componentWillUnmount() {
        clearInterval(this.intervalID);
      }
    getData = async () => {
        await axios.get('/event/latestEvent')
            .then((res) => {
                if (res.data.status) {
                    this.data = res.data
                    this.setState({ isLoading: false })
                }
                else {
                    alert(res.data.error)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <View style={styles.cont}>
                {this.state.isLoading ?<Loading />
                    : <ListEvents data={this.data.data} page="Latest" />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
