import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../Helper/Colors'
import EncryptedStorage from 'react-native-encrypted-storage';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import ListMessage from '../ListMessage';
import { ScrollView } from 'react-native';
import Loading from '../../Helper/Loading';

export default function MessengerScreen(props) {
    const [user, setuser] = useState('')
    const [messageList, setMessageList] = useState([])
    const [message, setmessage] = useState('')
    const [sender_id, setSender_id] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true)
    const scrollViewRef = useRef();

    const getData = () => {
        firestore()
            .collection('messenger')
            .doc(sender_id.toString())
            .collection(user.user_id.toString())
            .orderBy('timestamp')
            .onSnapshot(snapshot =>setMessageList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))))
    }


    useEffect(() => {
        if (!user || !sender_id) return
        getData()
    }, [user, sender_id])

    useEffect(() => {
        setuser(props.route.params.user)
        getSender()
    }, [props.navigation])

    const getSender = async () => {
        const user = await EncryptedStorage.getItem('user')
        const res = JSON.parse(user)
        setRole(res.role)
        setSender_id(res.user_id)
    }
    const send = () => {
        firestore().collection('messenger').doc(sender_id.toString()).collection(user.user_id.toString())
            .add({
                from: sender_id,
                to: user.user_id,
                message,
                sender_role: role,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        firestore().collection('messenger').doc(user.user_id.toString()).collection(sender_id.toString())
            .add({
                from: sender_id,
                to: user.user_id,
                message,
                sender_role: role,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        setmessage('')
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                style={styles.message}
            >
                {messageList?.length === 0 ? <Text>No Message Till Date</Text>
                    :
                    <View>
                            <View>
                                {messageList.map(item =>
                                    <ListMessage
                                        key={item.id}
                                        data={item}
                                        sent={sender_id === item.to}
                                    />)}
                            </View>
                    </View>
                }
            </ScrollView>
            <View style={styles.input}>
                <TextInput
                    label={'Type Message' || message}
                    underlineColor='transparent'
                    underline={false}
                    onChangeText={e => setmessage(e)}
                    style={{ borderRadius: 20, height: 50, width: '80%' }}
                    onSubmitEditing={send}
                />
                <TouchableOpacity disabled={!message} style={{ borderRadius: 100, backgroundColor: '#fff', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }} onPress={send}>
                    <Icon name='send' size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    message: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff"
    },
    input: {
        flexDirection: 'row',
        width: '95%',
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5
    }
})
