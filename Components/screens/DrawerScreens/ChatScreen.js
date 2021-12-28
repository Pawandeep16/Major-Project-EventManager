import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Card, Paragraph, Title } from 'react-native-paper'
import Loading from '../../../Helper/Loading'
import axios from '../../Axios/axios'
import EncryptedStorage from 'react-native-encrypted-storage';
import { Avatar } from 'react-native-elements';
export default function ChatScreen({ navigation }) {

    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [role, setrole] = useState('')
    useEffect(async() => 
    {
        const res =await EncryptedStorage.getItem('user')
        let data=JSON.parse(res)
        setrole(data.role)
        await user()
    }, [navigation,role])
    const user=async ()=>
    {
        if(role=='admin')
        {
            await axios.get('/notify/users')
                .then((res) => {
                    setusers(res.data.users)
                })
                .then(()=>setloading(false))
                .catch((e) => console.log(e))
        }
        else
        {
            await axios.get('/teacher/allTeachers')
            .then((res) => {
                setusers(res.data.data)
            })
            .then(()=>setloading(false))
            .catch((e) => console.log(e))
        }
    }
    const send = (flag, id) => 
    {
        navigation.navigate("Messenger", { user: { name: flag, user_id: id } })
    }
    return (
        <View style={styles.chat}>
            {loading ? <Loading /> :
                <Card style={{flex:1,backgroundColor:'#fff'}}>
                    {users?.length != 0 ?
                            <ScrollView>
                                {users?.map(item =>
                                    <TouchableOpacity style={styles.card} onPress={() => send(item.name, item.id)} key={item.id}>
                                        <Avatar
                                            rounded
                                            source={{
                                                uri:
                                                    'https://i.pravatar.cc/300',
                                            }}
                                            size='medium'
                                        />
                                        <Card.Title style={{ elevation: 10, padding: 20 }} title={item.name} subtitle="Online" />
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                            : null
                    }
                </Card>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        backgroundColor: "#fff"
    },
    card:{
        flexDirection: 'row',
        width:'100%',
        alignItems: 'center',
        paddingLeft:20, 
        backgroundColor:'#fff',
        borderBottomWidth:0.2,
    }
})
