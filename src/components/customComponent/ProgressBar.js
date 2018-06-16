import React from 'react'
import {
    View, ActivityIndicator, StyleSheet, Platform
} from 'react-native'

const ProgressBar = () => {
    return (
        <View style={styles.progressBar}>
            <ActivityIndicator size='large' color={Platform.OS === 'ios' ? 'white' : '#EA0000'} />
        </View>)
}
const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    }
})

export default ProgressBar