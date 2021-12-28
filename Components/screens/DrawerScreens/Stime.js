import React, { useEffect, useState } from 'react';
import axios from '../../Axios/axios';
import { View, StyleSheet } from 'react-native';
import days from "../../../Helper/Days";
import Table from '../../Table';
import { Button } from 'react-native-paper';
import Loading from '../../../Helper/Loading';

export default function Stime() {
  const [day, setDay] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.post('/timetable/getList', { day })
      .then((res) => {
        if (res.data.status) {
          setData(res.data.data)
          setLoading(false)
        }
        else {
          setData([])
          setLoading(false)
        }
      })
      .catch((err) => console.log(err))
  }, [day])
  return (
    <View style={styles.container}>

      <View style={styles.tabView}>
        {days.map(item => {
          return (
            <Button mode="outlined" onPress={() => {
              setDay(item.id)
              setLoading(true)
            }} key={item.id}>{item.day}</Button>
          )
        }
        )}
      </View>
      <View style={{ flex: 2}}>
        {loading ? <Loading />
          : <>
            {data.length != 0 && <Table table={data} />}
          </>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  tabView: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    elevation:10
  }
});