import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { TextInput } from 'react-native-paper'
import { Colors } from '../../../Helper/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import Textarea from 'react-native-textarea';
import axios from "../../Axios/axios"
import EncryptedStorage from 'react-native-encrypted-storage';
import Loading from '../../../Helper/Loading'
export default class AddNotice extends Component {
    navigation = ''
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.state =
        {
            posted_by: '',
            detail: '',
            id: null,
            posted_on: '',
            loading:true,
            showPicker: false, 
        }
        this.getUser()
    }
    getUser = async () => 
    {
        let user = await EncryptedStorage.getItem('user')
        let res = JSON.parse(user)
        if (res != null) {
            this.setState({ id: res.user_id })
            this.fetchUser()
        }
    }
    fetchUser = async () => {
        let data =
        {
            id: this.state.id
        }
        await axios.post('/teacher/list', data)
            .then((res) => {
                this.setState({posted_by:res.data.list.name,loading:false})
            })
            .catch((err) => console.log('Notice', { err }))
    }
    addNotice = async () => {
        let body = {
            posted_by: this.state.posted_by,
            detail: this.state.detail,
            posted_on: this.state.posted_on,

        }
        await axios.post("/notice/addNotice", body)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    this.navigation.replace("Welcome")
                }
            }
            ).catch((err) => { console.log(err) })
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ backgroundColor: '#eee' }}>
            {this.state.loading
            ? <Loading/>
            : 
                <ScrollView bounces={false}>
                    <View style={styles.cont}>
                        <Text style={{ fontSize: 30, color: Colors.btn, margin: 5, padding: 5, fontWeight: 'bold', fontFamily: 'Helvetica', marginTop: '20%' }}>Add Notice Here,</Text>
                        <TextInput
                            label={this.state.posted_by}
                            right={<TextInput.Icon name="account-multiple" />}
                            style={styles.input}
                            underlineColor='transparent'
                            dense={true}
                            editable={false}
                        />
                        <Textarea
                            containerStyle={styles.input}
                            style={styles.textarea}
                            onChangeText={(e) => this.setState({ detail: e })}
                            defaultValue={this.state.detail}
                            maxLength={255}
                            placeholder={'Add Details About the notice here'}
                            placeholderTextColor={'grey'}
                            underlineColorAndroid={'transparent'}
                        />
                        <View style={styles.input}>
                            <TouchableOpacity style={{ padding: 5, height: 60, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }} onPress={() => this.setState({ showPicker: true })}>
                                <Text style={{ color: 'grey' }}>{!this.state.posted_on ? 'Choose Date And Time' : 'Date:-' + this.state.posted_on + '\n'}</Text>
                                <Icon name="calendar-o" size={20} color={Colors.btn} />
                            </TouchableOpacity>

                            {
                                this.state.showPicker ?
                                    <DatePicker
                                        modal
                                        date={new Date()}
                                        open={this.state.showPicker}
                                        onConfirm={(date) => {
                                            let selectedDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
                                            this.setState({ posted_on: selectedDate,showPicker: false  })
                                        }}
                                        onCancel={() => {
                                            this.setState({ showPicker: false })
                                        }}
                                    />
                                    : null
                            }
                        </View>


                        <TouchableOpacity style={styles.button} onPress={this.addNotice}>
                            <Text style={styles.btntext}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '88%',
        backgroundColor: '#fff',
        elevation: 5,
        margin: 10,
        padding: 4,
        borderRadius: 5,
    },
    textareaContainer: {
        width: '88%',
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 170,
        fontSize: 14,
        color: '#333',
    },
    upperCont: {
        flex: 1,
        width: "90%",
        borderRadius: 10,
        justifyContent: 'center',
    },
    button: {
        margin: 20,
        width: 200,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#1d3557',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        alignSelf: 'center',
        elevation: 5
    },
    btntext: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    }
})
