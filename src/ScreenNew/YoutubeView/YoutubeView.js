import React, { Component } from 'react';
import { View, WebView, StyleSheet, StatusBar, Text } from 'react-native'
// https://m.youtube.com/
class ReactWebView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: 'https://m.youtube.com/' }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default ReactWebView

