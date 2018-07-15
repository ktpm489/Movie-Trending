import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
class RssAddInput extends Component {
    constructor(props){
        super(props)
        this.state = {
            rssUrl :this.props.rssUrl
        }
    }
  render() {
    return (
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.textInput}
            placeholder={' Add new feed URL...'}
            value={this.props.rssUrl}
            onChangeText={this.props.handleChange}
            autoCorrect={false}
            autoCapitalize='none'
            underlineColorAndroid={'transparent'}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={this.props.handleSave}>
                <Ionicons
                    name={'md-add-circle'}
                    size={24}
                    color={'#CCC'}
                />
            </TouchableOpacity>
        </View>
    )
  }
}
const styles = StyleSheet.create({
    inputContainer : {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
     textInput : {
         flex: 1,
         height: 40,
         fontSize:  13,
         padding : 10
     },
     iconContainer : {
         marginRight: 10,
         padding :5
     }

})

export default  RssAddInput 
