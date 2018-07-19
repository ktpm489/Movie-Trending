import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Text } from 'react-native'
import WebView from 'react-native-android-fullscreen-webview-video'
// https://m.youtube.com/
class ReactWebView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <WebView
                    javaScriptEnabled={true}
                    javaScriptEnabledAndroid={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    nativeConfig={true}
                    allowUniversalAccessFromFileURLs={true}
                    mixedContentMode={'compatibility'}
                    startInLoadingState={true}
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

