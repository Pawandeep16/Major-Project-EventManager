import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native';
export default class Loading extends Component {
    props = null
    navigation = ''
    constructor(props) {
        super(props)
        this.props = props
        this.navigation = props.navigation
    }
    render() {
        return (
            <View style={styles.cont}>
            {this.props.page === 'splash' ?
            <LottieView source={require('../Components/Assests/LottieAnimations/ghanti.json')} autoPlay loop />
            :
            <LottieView source={require('../Components/Assests/LottieAnimations/alarm.json')} autoPlay loop />
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        width:'100%', 
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
