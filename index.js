/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import send_notification from './Helper/Notifications';

messaging().subscribeToTopic('topic').then(()=>console.log("Subscribed")).catch((e)=>console.log({e}));

messaging().setBackgroundMessageHandler(async remoteMessage => {
    /**
     * TODO: Send Background Notification here with help of _notification_sender helper method
     */
    console.log('sent background notification')
    send_notification(remoteMessage);
})
messaging().onMessage(async remoteMessage => 
    {
    /**
     * TODO: Send Active App Notification here with help of _notification_sender helper method
     */
    console.log('notifi')
    send_notification(remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
