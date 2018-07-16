import React , {Component} from 'react'
import {View, StyleSheet, Share,Keyboard } from 'react-native'
import Colors from '../constants/Colors'
import EntryDetail from '../components/rsscomponents/EntryDetail'
import Ionicons from 'react-native-vector-icons/Ionicons';
class EntryScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
           // headerStyle: { backgroundColor: '#3c3c3c' },
            headerRight: <Ionicons style={{ marginRight: 15, color: 'blue' }} name={'ios-add'} size={25} onPress={() => params.handleSave()} />
        };
    };

    componentDidMount() {
        Keyboard.dismiss()
        this.props.navigation.setParams({ handleSave : this.handleSave })   
    }

    handleSave = () => {
        const { entry } = this.props.navigation.state.params
        let shareData = {
            title: entry.title,
            message: entry.date || entry.pubDate,
            url: entry.link

        };
        Share.share(shareData).catch(err => console.log(err));
    }
    render(){
    const { entry } = this.props.navigation.state.params
    const { navigate } = this.props.navigation;
    console.log('Entry', entry)
    return(
    <View style={styles.container}>
            <EntryDetail entry={entry} param={navigate}/>
    </View>
)}

}
// configurations route
// EntryScreen.route = {
//     navigationBar: {
//         visible: true,
//         title(params) {
//             return params.entry.title;
//         },
//         backgroundColor: Colors.dark,
//         tintColor: '#FFF'
//     }
// };

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#EEE',
    }
})

export default EntryScreen