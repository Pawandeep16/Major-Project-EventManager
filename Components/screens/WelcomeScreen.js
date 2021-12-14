import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import Home from '../screens/DrawerScreens/Home';
import Stime from './DrawerScreens/Stime';
import Events from './DrawerScreens/Events';
import AddEvents from './AddEvents';
import AddNotice from './DrawerScreens/AddNotice';
const Drawer = createDrawerNavigator();

export default function WelcomeScreen(props) {
  return (
    <Drawer.Navigator
      initialRouteName="Events"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home}  />
      <Drawer.Screen name="TimeTable" component={Stime} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="AddEvent" component={AddEvents} />
      <Drawer.Screen name="Notice" component={AddNotice} />
    </Drawer.Navigator>
  );
}
