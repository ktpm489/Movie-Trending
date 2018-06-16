// use https://github.com/magicismight/react-native-root-toast
// https://github.com/archriss/react-native-snap-carousel
// https://github.com/robcalcroft/react-native-in-app-notification
// dung thang nay https://github.com/prscX/react-native-spruce
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
    Dimensions
} = React;

let deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width

var SampleApp = React.createClass({

    openModal() {
        Animated.timing(this.state.modalY, {
            duration: 300,
            toValue: 0
        }).start();
    },

    closeModal() {
        Animated.timing(this.state.modalY, {
            duration: 300,
            toValue: -deviceHeight
        }).start();
    },

    getInitialState() {
        return {
            modalY: new Animated.Value(-deviceHeight)
        }
    },

    render() {
        var Modal = <Animated.View style={[styles.modal, { transform: [{ translateY: this.state.modalY }] }]}>
            <TouchableHighlight onPress={this.closeModal} underlayColor="green" style={styles.button}>
                <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableHighlight>
        </Animated.View>

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.openModal} underlayColor="green" style={styles.button}>
                    <Text style={styles.buttonText}>Show Modal</Text>
                </TouchableHighlight>
                {Modal}
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'green',
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white'
    },
    modal: {
        height: deviceHeight,
        width: deviceWidth,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#ededed',
        justifyContent: 'center',
    }
});

AppRegistry.registerComponent('SampleApp', () => SampleApp);