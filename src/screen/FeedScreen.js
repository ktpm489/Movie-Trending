import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import FreedList from '../components/rsscomponents/FeedList'

const FeedScreen = (props) => {
   // console.log('PropsFeedScreen', props, props.navigation.state.params)
    const { entries, title } = props.navigation.state.params 
    const { navigate } = props.navigation;
    console.log('navigate', navigate)
    return(
    <View style={styles.container}>
            <FreedList entries={entries} params={navigate}/>
    </View>
)}

//configurations route

// FeedScreen.route = {
//     navigationBar: {
//         visible: true,
//         title(params) {
//             return params.title;
//         },
//         backgroundColor: Colors.dark,
//         tintColor: '#FFF'
//     }
// };

const styles =StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#EEE',
    }
})

export default FeedScreen