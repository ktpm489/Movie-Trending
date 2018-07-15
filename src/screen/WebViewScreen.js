import React , { Component} from 'react'
import { ScrollView, Text, Linking, StyleSheet, WebView, View, ActivityIndicator } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Colors from '../constants/Colors'

class WebViewScreen extends Component {
    constructor(props){
        super(props)

        this.state= {
            isLoading : false,
            isError : false,
        }
    }

    

    onLoad = (e) => {
        console.log('Load End', e)
        this.setState({isLoading : false })
    }
    onError = (e) => {
        console.log('Load Error' , e)
        this.setState({isError : true })
    }
    onLoadStart = (e) => {
        console.log('Load Start', e)
       this.setState({ isLoading: true })
    }
    renderLoading = () => {
        return (
            <ActivityIndicator style={styles.indicator} size="large" color="#00ff00" /> 
        )
    }
    renderError = () => {
        return (
            <Text style={styles.errorText}>
               {'Error when loading page'}
        </Text>
        )
    }

    render() {
        const { entry } = this.props.navigation.state.params 
    console.log('ENTRY WEBVIEW', entry)
    return (   

        // https://stackoverflow.com/questions/38963046/can-i-use-webview-inside-a-view-react-native
        <View style={styles.containerMain}>
                <WebView 
                renderLoading={this.renderLoading}
                renderError={this.renderError}
                startInLoadingState={true}
                source={{ uri: `${entry.link}`}}
                scalesPageToFit ={true} 
                 />  
        </View>
    )
}
}

const styles = StyleSheet.create({
    containerMain : {
        flex: 1,
    },
    container: {
        backgroundColor :'#FFF',
        marginBottom: 5,
        padding: 7,
    },
    title : {
        color :'#555',
        fontSize : 16,
        fontWeight: '600',
    },
    author : {
        color :'#AAA',
        fontSize : 50,
        fontWeight :'500',
        paddingTop :7
    },
    a: {
        color : Colors.blue
    },
    indicator: {
        flex: 1,
        alignSelf: 'center',
        
    },
    errorText: {
        color: '#555', alignContent: 'center', alignSelf: 'center', flex: 1, fontSize: 30, paddingTop: 250 
    }

})
export default WebViewScreen