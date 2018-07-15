import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet ,Image } from 'react-native'
const noImage = require('../../Assets/imageNoFound.png')
class EntryItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isError : false 
        }
    }
    handlePress = () => {
        // this.props.navigator.push('entry', { entry : this.props.entry })
        this.props.param('entry',
            {
                entry: this.props.entry,
                title: this.props.entry.title
            }
        )

    }
    onError= (e) => {
        console.log('Can not load image')
        this.setState({ isError : true })
    }

    render() {
        const { entry } = this.props
        const { isError } = this.state
        const data = isError ? noImage : {uri: entry.thumbnail}
        return (
            <TouchableOpacity onPress={this.handlePress}>
                {/* <View style={styles.rssContainer}>
                    <Text style={styles.title} numberOfLines={2}>
                        {entry.title}
                    </Text>
                    <Text style={styles.footer}>
                        {entry.author}
                    </Text>
                </View> */}
                <View style={styles.container}>
                    <Image
                        source={data}
                        resizeMode='cover'
                        onError={this.onError}
                        style={styles.thumbnail} />
                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{entry.title}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom:  10,
    }, thumbnail: {
        width: 150,
        height: 150
    }, rightContainer: {
        flex: 1,
      //  marginLeft: 10
    }, title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#777',
    },
    rssContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginBottom: 5,
        padding: 7
    },
    // title: {
    //     color: '#555',
    //     fontSize: 16,
    //     fontWeight: '600',
    // },
    body: {
        color: '#777',
        fontSize: 12,
        paddingTop: 7,
    },
    footer: {
        color: '#AAA',
        fontSize: 9,
        fontWeight: '500',
        paddingTop: 7,
    }
})

export default EntryItem;
