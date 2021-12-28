import React, { Component } from 'react'
import { Text, StyleSheet, View} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../Helper/Colors';
import Loading from '../Helper/Loading';
import axios from './Axios/axios';
import ListEvents from './ListEvents';
export default class LatestEvent extends Component {
    data = []
    constructor(props) {
        super(props)
        this.getData()
        this.state={
            data:[],
        }
    }
    getData = async () => {
        await axios.get('/event/latestEvent')
            .then((res) => {
                if (res.data.status) 
                {
                    this.setState({data:[res.data.data]})
                }
                else {
                    alert(res.data.error)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount(){
        this.getData()
    }
    render() {
        return (
            <View style={styles.cont}>
            <ListEvents data={this.state.data} page="Latest" />
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
