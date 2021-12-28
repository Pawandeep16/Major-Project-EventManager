import axios from './Axios/axios'
import React, { Component } from 'react'
import { Text, StyleSheet, View} from 'react-native'
import ListEvents from './ListEvents'
import Loading from '../Helper/Loading'
import { Colors } from '../Helper/Colors'
import { ActivityIndicator } from 'react-native-paper';

export default class AllEvents extends Component {
    data = []
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
        this.getData()
    }
    getData = async () => {
        await axios.get('/event/getEvents')
            .then((res) => {
                if (res.data.status) 
                {
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
                {this.state.isLoading ?
                    <ActivityIndicator animating={true} color={Colors.btn} />
                    : <ListEvents data={this.data.data} page="All" />
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
    },

})
