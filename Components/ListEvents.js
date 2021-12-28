import axios from './Axios/axios'
import React, { Component } from 'react'
import { Linking } from 'react-native'
import { Text, StyleSheet, View, ScrollView, SectionList, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import { ActivityIndicator, Button } from 'react-native-paper'
import { Colors } from '../Helper/Colors'
import Loading from '../Helper/Loading'
export default class ListEvents extends Component {
    data = []
    page = ''
    props = null
    constructor(props) {
        super(props)
        this.props = props
        this.page = props.page
        this.state = {
            data: [],
            loading:true
        }
        this.interval
    }
    interval = setInterval(() => {
        let temp = this.props.data
        this.setState({ data: temp ,loading:false})
    }, 1000);

    delete = async (flag) => {
        let data = {
            id: flag
        }
        axios.post('/event/deleteEvent', data)
            .then((res) => {
                if (res.data.status) {
                    alert('Event deleted successfully')
                }
            })
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <View>
                {this.page == 'Latest' ?
                    <View style={styles.allCard}>
                    {this.state.loading ? 
                    <ActivityIndicator animating={true} color={Colors.btn} size={70}/> :
                        <ScrollView >
                            {this.state.data.length != 0 ?
                                this.state.data.map(item =>
                                    <Card key={item.id} containerStyle={styles.cardAll}>
                                        <View >
                                            <Card.Title h4 style={{
                                                color: Colors.btn, textTransform: 'uppercase',
                                                textDecorationLine: 'underline',
                                            }}>{item.title}
                                            </Card.Title>
                                            <Button icon="delete" mode="contained" onPress={() => this.delete(item.id)}>
                                            </Button>
                                        </View>
                                        {/* <Card.Divider /> */}
                                        <View style={styles.data}>
                                            <Text style={styles.head}>Organized_By:-</Text>
                                            <Text style={styles.text}>{item.organized_by}</Text>
                                        </View>
                                        <View style={styles.data}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: "500", textAlign: 'justify'
                                            }}>{item.description}</Text>
                                        </View>

                                        <View style={styles.data}>
                                            <Text style={styles.head}>Venue:-</Text>
                                            <Text style={styles.text}>{item.venue}</Text>
                                        </View>
                                        <View style={styles.data}>
                                            <Text style={styles.head}>Date:-</Text>
                                            <Text style={styles.text}>{item.date}</Text>
                                        </View>
                                        <View style={styles.data}>
                                            <Text style={styles.head}>Time:-</Text>
                                            <Text style={styles.text}>{item.time}</Text>
                                        </View>
                                        <View style={styles.data}>
                                            <Text style={styles.head}>Contact:-</Text>
                                            <Text style={styles.text}>{item.contact}</Text>
                                        </View>
                                        {/* <Card.Divider /> */}
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(item.registerLink)}>
                                                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Register Here</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                ) : <Loading/>
                            }

                        </ScrollView>
                    }
                    </View>
                    :
                    <View style={styles.allCard}>
                    {this.state.loading ? 
                    <ActivityIndicator animating={true} color={Colors.btn} size={70}/> :
                        <ScrollView >
                            {this.state.data.map(res =>
                                <Card key={res.id} containerStyle={styles.cardAll}>
                                    <Card.Title h4 style={{ color: Colors.btn, textTransform: 'uppercase', textDecorationLine: 'underline' }}>{res.title}</Card.Title>
                                    <Button icon="delete" mode="contained" onPress={() => this.delete(res.id)}>
                                    </Button>
                                    {/* <Card.Divider /> */}
                                    <View style={styles.data}>
                                        <Text style={styles.head}>Organized_By:-</Text>
                                        <Text style={styles.text}>{res.organized_by}</Text>
                                    </View>
                                    <View style={styles.data}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "500", textAlign: 'justify'
                                        }}>{res.description}</Text>
                                    </View>

                                    <View style={styles.data}>
                                        <Text style={styles.head}>Venue:-</Text>
                                        <Text style={styles.text}>{res.venue}</Text>
                                    </View>
                                    <View style={styles.data}>
                                        <Text style={styles.head}>Date:-</Text>
                                        <Text style={styles.text}>{res.date}</Text>
                                    </View>
                                    <View style={styles.data}>
                                        <Text style={styles.head}>Time:-</Text>
                                        <Text style={styles.text}>{res.time}</Text>
                                    </View>
                                    <View style={styles.data}>
                                        <Text style={styles.head}>Contact:-</Text>
                                        <Text style={styles.text}>{res.contact}</Text>
                                    </View>
                                    {/* <Card.Divider /> */}
                                    <View style={{ alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(res.registerLink)}>
                                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Register Here</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Card>
                            )
                            }
                        </ScrollView>
                    }
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 7
    },
    allCard: {
        flex: 1,
        borderRadius: 20,
        width: "90%"
    },
    heading: {
        fontSize: 23
    },
    cardAll: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 10
    },
    sectionHeader:
    {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        width: '100%',
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    text: {
        marginLeft: 15,
        width: 140,
        fontSize: 15,
        fontWeight: "500",
    },
    head: {
        width: 120,
        fontSize: 16,
        fontWeight: 'bold',
    },
    data: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 5,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 35,
        backgroundColor: Colors.btn,
        borderRadius: 5,
    }
})
