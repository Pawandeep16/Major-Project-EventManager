import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import axios from "../Axios/axios";
import { Colors } from '../../Helper/Colors';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome'

// const onChange = (event, selectedDate) => 
// {
//     this.setState({date:selectedDate})
// };
// const [date, setDate] = useState(new Date())
// const [open, setOpen] = useState(false)
export default class AddEvents extends Component {
    navigation=''
    constructor(props) 
    {
        super(props)
        this.navigation=props.navigation
        this.state = 
        {
            name: '',
            title: '',
            venue: '',
            date: '',
            time: '',
            description: '',
            link: '',
            showModal: false,
            pin: null,
            contact: '',
            showPicker: false
        }
    }

    add = async() => {
        if (this.state.pin === '2021') {
            let data = {
                title: this.state.title,
                description: this.state.description,
                time: this.state.time,
                date: this.state.date,
                venue: this.state.venue,
                organized_by: this.state.name,
                contact: this.state.contact,
                registerLink: this.state.link,
            }
            await axios.post("/event/addEvent", data)
                .then((res) => {
                    console.log(res.data)
                    if(res.data.status)
                    {
                        this.navigation.replace('Welcome')
                    }
                })
                .catch((err) => alert(err))
        }
        else{
            alert('invalid pin')
        }
    }
    confirm = () => {
        return (
            <View style={styles.confirm}>
                <Text style={{ margin: 20, color: 'white', fontSize: 23, fontWeight: 'bold' }}>Confirm your IDentity </Text>
                <TextInput
                    label="Pin"
                    Type="Outlined"
                    underlineColorAndroid="transparent"
                    right={<TextInput.Icon name="lock" />}
                    style={styles.input}
                    underlineColor='transparent'
                    onChangeText={(e) => this.setState({ pin: e })}
                    dense={true}
                />
                <View style={{flexDirection:'row'}}>

                <Button mode="contained" onPress={this.add} style={{ margin: 20 }}>
                    Add
                </Button>
                <Button mode="contained" onPress={()=> this.setState({showModal: false})} style={{ margin: 20 }}>
                    Cancel
                </Button>
                </View>
            </View>
        )
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={{ backgroundColor: '#eee' }}>
                <ScrollView bounces={false}>
                    <View style={styles.cont}>
                        <Text style={{ fontSize: 30, color: Colors.btn, margin: 5, padding: 5, fontWeight: 'bold', fontFamily: 'Helvetica' }}>Add Event Here,</Text>
                        <TextInput
                            label="Name of the Organization"
                            autoFocus={true}
                            right={<TextInput.Icon name="account-multiple" />}
                            style={styles.input}
                            underlineColor='transparent'
                            onChangeText={(e) => this.setState({ name: e })}
                            selectionColor={Colors.btn}
                            activeOutlineColor={Colors.btn}
                            dense={true}
                        />
                        <TextInput
                            label="Title"
                            right={<TextInput.Icon name="chevron-double-right" />}
                            style={styles.input}
                            underlineColor='transparent'
                            onChangeText={(e) => this.setState({ title: e })}
                            dense={true}
                        />
                        <TextInput
                            label="Venue"
                            Type="Outlined"
                            underlineColorAndroid="transparent"
                            right={<TextInput.Icon name="home" />}
                            style={styles.input}
                            underlineColor='transparent'

                            dense={true}
                            onChangeText={(e) => { this.setState({ venue: e }) }}
                        />
                        <View style={styles.input}>
                            <TouchableOpacity style={{ padding: 5, height: 60, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }} onPress={() => this.setState({ showPicker: true })}>
                                <Text style={{ color: 'grey' }}>{!this.state.date ? 'Choose Date And Time' : 'Date:-' + this.state.date + '\n' + 'Time:-' + this.state.time}</Text>
                                <Icon name="calendar-o" size={20} color={Colors.btn} />
                            </TouchableOpacity>
                            {this.state.showPicker ?
                                <DatePicker
                                    modal
                                    date={new Date()}
                                    open={this.state.showPicker}
                                    onConfirm={(date) => {
                                        let time = date.getHours().toString() + '-' + date.getMinutes().toString()
                                        let selectedDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString()
                                        this.setState({ date: selectedDate,time:time ,showPicker: false})
                                    }}
                                    onCancel={() => {
                                        this.setState({ showPicker: false })
                                    }}
                                />
                                : null
                            }
                        </View>
                        <TextInput
                            label="Phone Number"
                            autoFocus={true}
                            right={<TextInput.Icon name="phone" />}
                            style={styles.input}
                            underlineColor='transparent'
                            onChangeText={(e) => this.setState({ contact: e })}
                            selectionColor={Colors.btn}
                            activeOutlineColor={Colors.btn}
                            dense={true}
                        />
                        <TextInput
                            label="Description"
                            multiline
                            right={<TextInput.Icon name="note" />}
                            style={styles.input}
                            underlineColor='transparent'
                            dense={true}
                            onChangeText={(e) => { this.setState({ description: e }) }}
                        />
                        <TextInput
                            label="Link for Registeration"
                            right={<TextInput.Icon name="link" />}
                            style={styles.input}
                            underlineColor='transparent'
                            dense={true}
                            onChangeText={(e) => { this.setState({ link: e }) }}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => this.setState({ showModal: true })}>
                            <Text style={styles.btntext}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.state.showModal && this.confirm()}
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
    confirm: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.89)',
        alignItems: 'center',
        padding: 20,
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
