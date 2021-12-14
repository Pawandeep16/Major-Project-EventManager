import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { DataTable } from 'react-native-paper'
import Loading from '../Helper/Loading'

export default class Table extends Component {
    constructor(props) {
        super(props)
        this.state={
            loading:false
        }
    }
    render() {
        return (
            <>
            {this.state.loading? <Loading/>: 
            <DataTable style={{ backgroundColor: 'white', elevation: 5, padding: 5 }}>
                <DataTable.Header>
                    <DataTable.Title>Time</DataTable.Title>
                    <DataTable.Title>Subject</DataTable.Title>
                    <DataTable.Title>Venue</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Frozen </DataTable.Cell>
                    <DataTable.Cell >159</DataTable.Cell>
                    <DataTable.Cell >6.0</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            }
            </>
        )
    }
}

const styles = StyleSheet.create({})