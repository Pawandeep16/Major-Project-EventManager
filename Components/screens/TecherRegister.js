import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'
import axios from '../Axios/axios'
import { TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { Colors } from '../../Helper/Colors';
import EncryptedStorage from 'react-native-encrypted-storage';
export default class TeacherRegister extends Component {
    navigation = ''
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            customPin: '',
            confirmPin: '',
            phoneNumber: ''
        };
        this.navigation = props.navigation;
    }
    store = async (flag, role,id) => {
        let data =
        {
            user: flag,
            role: role,
            user_id: id
        }
        await EncryptedStorage.setItem(
            "user", JSON.stringify(data)
        );
        console.log({ data })
    }
    check = () => {
        if (this.state.customPin == this.state.confirmPin) {
            this.send()
        }
        else {
            alert("Re-enter the correct password");
        }
    }
    send = async () => {
        let data =
        {
            name: this.state.name,
            teacherPin: this.state.customPin,
            phone_number: this.state.phoneNumber
        }
        await axios.post('/teacher/register', data)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) 
                {
                    this.store(res.data.status, 'admin',res.data.user.id)
                    this.navigation.replace('Welcome', { role: 'admin' });
                }
                else
                {
                    alert(res.data.errors)
                }
            })
            .catch((err) => alert(err))
    }
    render() {
        return (
            <KeyboardAvoidingView style={{ backgroundColor: '#eee' }}>
                <ScrollView bounces={false} contentContainerStyle={{ height: 700, marginTop: '20%', marginBottom: '20%' }}>
                    <View style={styles.cont}>
                        <Text style={{ fontSize: 22, color: Colors.btn, padding: 5, fontWeight: 'bold', fontFamily: 'Helvetica' }}> Set Your Custom Admin Account</Text>
                        <TextInput
                            label="Enter the Name"
                            autoFocus
                            right={<TextInput.Icon name="account" />}
                            style={styles.input}
                            type="text"
                            underlineColor='transparent'
                            selectionColor={Colors.btn}
                            activeOutlineColor={Colors.btn}
                            dense={true}
                            onChangeText={(e) => this.setState({ name: e })}

                        />
                        <TextInput
                            style={styles.input}
                            label="Enter the Mobile Number"
                            right={<TextInput.Icon name="phone" />}
                            required
                            maxLength={10}
                            keyboardType='numeric'
                            onChangeText={(e) => this.setState({ phoneNumber: e })}

                        />
                        <TextInput
                            style={styles.input}
                            label="Enter the Custom Pin"
                            right={<TextInput.Icon name="key" />}
                            secureTextEntry
                            required
                            maxLength={4}
                            keyboardType='numeric'
                            onChangeText={(e) => this.setState({ customPin: e })}

                        />
                        <TextInput
                            style={styles.input}
                            label="Confirm Pin"
                            right={<TextInput.Icon name="key" />}
                            secureTextEntry
                            keyboardType='numeric'
                            required
                            maxLength={4}
                            onChangeText={(e) => this.setState({ confirmPin: e })}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.check}>
                            <Text
                                style={{
                                    color: '#FFFF',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        alignItems: 'center',


    },
    input: {
        width: '88%',
        backgroundColor: '#fff',
        elevation: 5,
        margin: 5,
        borderRadius: 5
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topCont: {
        height: 50,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
    pinput: {
        borderColor: '#2B8BEB',
        borderWidth: 1,
        width: '80%',
        height: 50,
        margin: 10,
        borderRadius: 10,
    },
});