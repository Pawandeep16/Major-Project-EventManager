import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { DataTable } from 'react-native-paper'

const Table = ({ table,navigation }) => {
    // console.log(table)
    return (
        <View style={styles.container}>
            <DataTable style={{ width: '100%', backgroundColor: 'white' }}>
                <DataTable.Header style={{ backgroundColor: 'white', elevation: 10 ,justifyContent: 'space-around',alignItems: 'center'}}>
                    <Text style={{fontSize:18,fontWeight: 'bold',fontFamily:'sans-serif'}}>Time</Text>
                    <Text style={{fontSize:18,fontWeight: 'bold',fontFamily:'sans-serif'}}>Subject</Text>
                    <Text style={{fontSize:18,fontWeight: 'bold',fontFamily:'sans-serif'}}>Venue</Text>
                </DataTable.Header>
                <ScrollView contentContainerStyle={{width:'100%'}}>
                {table.map(item =>
                    <DataTable.Row key={item.id} style={{backgroundColor: 'white', elevation: 10 }}>
                        <DataTable.Cell numeric style={{alignItems: 'center',justifyContent: 'center'}}>{item.time}</DataTable.Cell>
                        <DataTable.Cell numeric style={{alignItems: 'center',justifyContent: 'center'}}>{item.subject}</DataTable.Cell>
                        <DataTable.Cell numeric style={{alignItems: 'center',justifyContent: 'center'}}>{item.venue}</DataTable.Cell>
                    </DataTable.Row>
                )}
                </ScrollView>
            </DataTable>
        </View>
    )
}

export default Table

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
