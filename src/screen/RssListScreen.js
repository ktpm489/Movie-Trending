import React, { Component } from 'react';
import { View, AsyncStorage, Alert, StyleSheet } from 'react-native'
import _ from 'underscore'
import Colors from '../constants/Colors'
import RssAddInput from '../components/rsscomponents/RssAddInput'
import RssList from '../components/rsscomponents/RssList'
import linkdata from '../data/link'
class RssListScreen extends Component {
  constructor(){
    super()
    this.state = {
      rssUrl: '',
      rssList: []
    }
  }
  componentWillMount() {
    this.getRssList()
  }

  getRssList = () => {
    AsyncStorage.getItem('rssList').then((response)=>{
      const rssList = JSON.parse(response) || []
      console.log('RssList', rssList)
      console.log('link', linkdata.data)
      if (linkdata.data.length > 0 && rssList.length === 0) {
        AsyncStorage.setItem('rssList', JSON.stringify(linkdata.data)).then(
          () => {
            this.setState({
              rssUrl: '',
              rssList : linkdata.data
            })
          })
      } else {
      this.setState({ rssList })
      }
    })
  }

  handleSaveRss = () => {
    const { rssList, rssUrl } = this.state
    if (rssUrl.length && !_.contains(rssList, rssUrl)) {
      rssList.push(rssUrl.trim())
      AsyncStorage.setItem('rssList', JSON.stringify(rssList)).then(
      ()=>{
        this.setState({
          rssUrl : '',
          rssList
        })
    })
    }
  }

  handleDeleteRss = (rssUrl) => {
    Alert.alert(
      'Delete Rss feed?',
      'this action cannot be undone',
      [
        {text :'Cancel', onPress : () =>{}, style :'cancel'},
        {text :'Delete', onPress: () =>{
          let {rssList} = this.state
          rssList = _.without(rssList, rssUrl)
          AsyncStorage.setItem('rssList', JSON.stringify(rssList)).then(
              () => {
                  this.setState({
                    rssList
                  })
              }) }, style : 'destructive'}
      ]
    )
  }
 
  handleChangeRssUrl = (rssUrl) =>{
    this.setState({rssUrl : rssUrl.trim()})
  }

  
  render() {
    const { navigate } = this.props.navigation;
   // console.log('navigate', navigate)
    return (
      <View style={styles.container}>
      <RssAddInput
      rssUrl={this.state.rssUrl}
      handleChange ={this.handleChangeRssUrl}
      handleSave={this.handleSaveRss}
      />
      <RssList
        urls={this.state.rssList}
        params={navigate}
        isRefreshing={false}
        handleRefresh={this.getRssList}
        hanleDelete={this.handleDeleteRss}
      />
      </View>
    )
  }
}
// configuration route
// RssListScreen.route = {
//   navigationBar: {
//     visible: true,
//     title: 'RSS Reader',
//     backgroundColor: Colors.dark,
//     tintColor: '#FFF'
//   }
// };

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#EEE',
  }
})

export default RssListScreen
