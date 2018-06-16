import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import Notification from 'react-native-in-app-notification';

export default class MyApp extends Component {

    onPressFunction = () => {
        this.notification && this.notification.show({
            title: 'You pressed it!',
            message: 'The Púh has been triggered',
            // onPress: () => Alert.alert('Alert', 'You clicked the notification!'),
        })
    }
    render() {
        return (
            <View>
                <Text>This is my app</Text>
                <TouchableHighlight
                    onPress={this.onPressFunction}
                >
                    <Text>Click me to trigger a notification</Text>
                </TouchableHighlight>
                <Notification ref={(ref) => { this.notification = ref; }} backgroundColour={'yellow'} closeInterval={1000} />
            </View>
        )
    }
}