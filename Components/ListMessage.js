import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ListMessage = ({data,sent}) => {
    const date = new Date().getDate()
    const date2 = parseInt(data.timestamp?.toDate().toString().substr(8, 2))

    return (
        <View style={!sent ? styles.messsageCard__userMessage : styles.messsageCard}>
            <Text h4>{data.message}</Text>
            <Text style={!sent ? styles.timestamp__userMessage : styles.timestamp}>
                {data.timestamp?.toDate()?.toTimeString().substr(0, 5)
                    ?
                    `${data.timestamp?.toDate()?.toTimeString().substr(0, 5)}, ${date !== date2 ? data.timestamp?.toDate().toString().substr(0, 10) : 'Today'}`
                    : ""
                }
            </Text>
        </View>

    )
}

export default ListMessage

const styles = StyleSheet.create({
    messsageCard: {
        backgroundColor: 'lightblue',
        minWidth: 120,
        maxWidth: "35%",
        borderTopRightRadius:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'flex-start',
        marginRight: "auto",
        marginHorizontal: 10,
        marginBottom: 35,
        marginTop: 35
    },
    messsageCard__userMessage: {
        backgroundColor: '#eee',
        minWidth: 120,
        maxWidth: "35%",
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: "auto",
        marginHorizontal: 10,
        marginBottom: 35,
        marginTop: 35
    },
    timestamp: {
        left: 0,
        position: 'absolute',
        bottom: -15
    },
    timestamp__userMessage: {
        right: 0,
        position: 'absolute',
        bottom: -15
    },
    userInfo: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: -30
    },
    username: {
        fontWeight: '700',
        marginLeft: 5,
    },
})
