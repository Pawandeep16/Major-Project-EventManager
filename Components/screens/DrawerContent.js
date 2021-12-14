import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../Helper/Colors';
import axios from '../Axios/axios'

function DrawerContent(props) {
  const [user, setUser] = useState(null)
  const [found, setFound] = useState(false)
  const [user_id, setUser_id] = useState(null)
  const [role, setRole] = useState('')
  const logout = async () => 
  {
    await EncryptedStorage.clear()
    props.navigation.replace("Splash")
  }
  const fetchUser = async () => 
  {
    if(role==='student')
    {
      let data =
      {
        id: user_id
      }
      await axios.post('/notify/getUser', data)
        .then((res) => {
          if (res.data.status) {
            setUser(res.data.data[0])
            setFound(false)
          }
        })
        .catch((err) => console.log(err))
    }
    else
    {
      let data =
      {
        id: user_id
      }
      await axios.post('/teacher/list', data)
        .then((res) => {
          setUser(res.data.list)
          setFound(false)
        })
        .catch((err) => console.log('Drawer',{err}))
    }
  }
  const getUser = async () => {
    let user = await EncryptedStorage.getItem('user')
    let res = JSON.parse(user)
    if (res != null) {
      setFound(true)
      setUser_id(res.user_id);
      setRole(res.role)
    }
  }
  
  if (found) {
    fetchUser()
  }

  useEffect(() => {
    getUser()
  },
    [props.navigation])

  const name = user?.name
  const email = user?.email
  const adminName=user?.name
  return (
    <View style={role==='student'?styles.drawer:styles.adminDrawer} >
      <DrawerContentScrollView {...props}>
        <View style={styles.topCont}>
          <TouchableOpacity>
            <Avatar.Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QQ2UKB6SGVrBSQpPuKAK0RDy_BPe4ME7kvsCWKN6AAwKjY4QIRLfHSDG9vqvR5aUazA&usqp=CAU',
              }}
              size={50}
            />
          </TouchableOpacity>
          <View style={styles.prfileinfo}>
            <Text style={{ textTransform: 'uppercase', color: Colors.drawertext ,fontWeight: 'bold',fontSize: 15 }}>{role==='student' ? name: adminName}</Text>
            <Caption style={{ color: Colors.drawertext }}>{role==='student'?email:'Admin'}</Caption>
          </View>
        </View>
        <View style={styles.middelcont}>
          <Drawer.Section>
            <DrawerItem
              labelStyle={{ color: Colors.drawertext }}
              icon={({ color, size }) => (
                <Icon name="home" color={Colors.drawertext} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}></DrawerItem>
            <DrawerItem
              labelStyle={{ color: Colors.drawertext }}
              icon={({ color, size }) => (
                <Icon name="calendar" color={Colors.drawertext} size={size} />
              )}
              label="TimeTable"
              onPress={() => {
                props.navigation.navigate('TimeTable');
              }}></DrawerItem>
            {
              role == 'admin' &&
              <DrawerItem
                labelStyle={{ color: Colors.drawertext }}
                icon={({ color, size }) => (
                  <Icon name="plus" color={Colors.drawertext} size={size} />
                )}
                label="AddNotice"
                onPress={() => {
                  props.navigation.navigate("Notice",{teacherName:adminName});
                }}></DrawerItem>
            }

            <DrawerItem
              labelStyle={{ color: Colors.drawertext }}
              icon={({ color, size }) => (
                <Icon name="clock" color={Colors.drawertext} size={size} />
              )}
              label="Ongoing Events"
              onPress={() => {
                props.navigation.navigate('Events');
              }}></DrawerItem>
            <Drawer.Section>
              <DrawerItem
                labelStyle={{ color: Colors.drawertext }}
                icon={({ color, size }) => (
                  <Icon name="plus" color={Colors.drawertext} size={size} />
                )}
                label="Add Events"
                onPress={() => {
                  props.navigation.navigate('AddEvent');
                }}></DrawerItem>
            </Drawer.Section>
            <DrawerItem
              labelStyle={{ color: Colors.drawertext }}
              icon={({ color, size }) => (
                <Icon name="chat" color={Colors.drawertext} size={size} />
              )}
              label="Messenger"></DrawerItem>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          labelStyle={{ color: Colors.drawertext }}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={Colors.drawertext} size={size} />
          )}
          label="Logout" onPress={logout} />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  topCont: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  prfileinfo: {
    marginLeft: 20,
  },
  middelcont: {
    marginTop: 20,
    marginLeft: 10,
  },
  drawer:
  { 
    flex: 1, 
    backgroundColor: Colors.drawer 
  },
  adminDrawer:{
    flex: 1, 
    backgroundColor: 'black'
  }
});
export default DrawerContent;
