import React from 'react'
import { ScrollView, Text, Linking, StyleSheet, WebView, View, Button, Image, Dimensions } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Colors from '../../constants/Colors'

const EntryDetail = (props) => {




    const { entry } = props
    console.log('ENTRY DETAIL', entry)
    const handlePress = () => {
        props.param('webview',
            {
                entry: props.entry,
                title: props.entry.title
            }
        )

    }

 
    const  drawImageScaled = (img) =>{
        let screenSize = Dimensions.get('window');
        const width = img.width || 300
        const height = img.height || 300
        let hRatio = screenSize.width / width;
        let vRatio = screenSize.height / height;
        let ratio = Math.min(hRatio, vRatio);
        return { width: parseInt(img.width * ratio), height: parseInt(height * ratio) };
    }
    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name == 'img') {
            const a = node.attribs;
            const src = a.src
            // if (src && src.endsWith('.gif')) {
            //     return (<Image style={{ width: 200, height: 50, alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }} source={{ uri: a.src }} resizeMode='cover' />);
            // } else {
            //     return (<Image style={{ width: 500, height: 200, alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }} source={{ uri: a.src }} resizeMode='cover' />);
            // }
            return (
                <Image
                    key={index}
                    source={{ uri: a.src }}
                    style={{
                        width: drawImageScaled(a).width,
                        height: drawImageScaled(a).height,
                        alignSelf:'center'
                    }}
                    resizeMode={'cover'} />
            );
        }
    }
    return (

        <ScrollView style={styles.scrollView}>
            {/* <Image
                source={{ uri: entry.thumbnail }}
                resizeMode ='cover'
                style={styles.fullImage} /> */}
            <View style={styles.textContainer}>
                {/* <Text style={styles.descriptionText}>{entry.description}</Text> */}
                <HTMLView
                    value={entry.content}
                    stylesheet={styles}
                    renderNode={renderNode}
                    onLinkPress={url => Linking.openURL(url)}
                />
                <Text style={styles.date}>{entry.pubDate || entry.date}</Text>
            </View>
            <Button
                style={{ borderWidth: 1, borderColor: 'blue', paddingBottom: 30 }}
                onPress={handlePress} title='Read More..' />
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginBottom: 5,
        padding: 7,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // title: {
    //     color: '#555',
    //     fontSize: 16,
    //     fontWeight: '600',
    // },
    author: {
        color: '#AAA',
        fontSize: 9,
        fontWeight: '500',
        paddingTop: 7
    },
    a: {
        color: Colors.blue
    },
    // container: {
    //     padding: 5,
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#000000',
    // },
    rightContainer: {
        flex: 1,
        marginLeft: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    year: {
        textAlign: 'center',
    },
    thumbnail: {
        width: 150,
        height: 150
    },
    listView: {
        backgroundColor: '#000000',
        flex: 1,
    },
    view: {
        backgroundColor: '#000000',
        flex: 1
    },
    textContainer: {
        padding: 10,
        flex: 1,
        width :'100%'
    },
    toolbar: {
        backgroundColor: '#9598A6',
        height: 56,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    descriptionText: {
        fontSize: 20,
        color: '#FFFFFF'
    },
    date: {
        marginTop: 20,
        textAlign: 'center',
        color: '#FF1422'
    },
    fullImage: {
        width: '100%',
        height: 300,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)'
    },
    scrollView: {
        flex: 1,
        paddingBottom: 30
    }

})
export default EntryDetail