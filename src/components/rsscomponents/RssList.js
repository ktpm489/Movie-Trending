import React from 'react'
import { ScrollView, Text,View, RefreshControl, StyleSheet, TouchableWithoutFeedback , Keyboard} from 'react-native'
import Colors from '../../constants/Colors'
import RssItem from '../rsscomponents/RssItem'

const RssList = (props) =>{
    const colorsOrder = [
        Colors.yellow,
        Colors.red,
        Colors.purple,
        Colors.blue,
        Colors.dark
    ]
    const renderRssItems = () => props.urls.map((url, index) =>(
        <RssItem
            key={index}
            url={url}
            param={props.params}
            hanleDelete={props.hanleDelete}
            color={colorsOrder[index % colorsOrder.length]}
        />
    ))
    const pressDismissKeyBoard = () => {
        Keyboard.dismiss()
    }
    return (
        // <TouchableWithoutFeedback onPress={pressDismissKeyBoard}>
        //     <View onStartShouldSetResponder={() => true}>
        <ScrollView
        style={styles.container}
        refreshControl={
            <RefreshControl
            refreshing={props.isRefreshing}
            onRefresh={props.handleRefresh}
            />
        }>
        {
            props.urls.length ?
            renderRssItems() :
            <Text style={styles.error}>No Rss</Text>
        }
        </ScrollView>
        // </View>
        // </TouchableWithoutFeedback>
    )

}
const styles = StyleSheet.create({
    container : {
        flex :1
    },
    error : {
        color :'#777',
        textAlign : 'center',
        marginTop : 15
    }
})

export default RssList