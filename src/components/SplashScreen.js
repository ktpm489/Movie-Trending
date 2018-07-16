import React, {Component} from 'react'
import {ActivityIndicator, Text, View, Keyboard } from 'react-native'
import * as _ from 'lodash'
import {connect} from 'react-redux'
import axios from 'axios'

import {configFetched, movieFetched} from '../Actions'
import {Avatar} from 'react-native-elements'
import {getUriPopulated} from '../utilities/utils'
import Constant from '../utilities/constants'
import { checkLocationSaveDataNoDispatch, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage } from '../utilities/globalFunction'
// import style, {primaryColor} from '../styles/light-theme'
import style, {primaryColor} from '../styles/light-theme'
//SAVESTORE
class SplashScreen extends Component {
  componentDidMount = async () => {
    Keyboard.dismiss()
    const apiKey = Constant.api_key
    let uri = `${Constant.api_base_url}/configuration?${apiKey}`
    const {onFetchCompleted, onConfigFetched, config, settings: {
        language
      }} = this.props
 setTimeout( async () => {
  console.log('Uri', uri)
   console.log('language', language, 'config', config)
   let currentData = await getAllItemFromStorage(uri)
   let movieLink = `${Constant.api_base_url}/movie/now_playing?${apiKey}&language=${language}&page=1`
   if (currentData && usedLocalData(currentData)) {
     console.log('Use current Data', currentData)
     onConfigFetched(currentData.data)
     console.log('Movie Link', movieLink)
     let currentMoveLinkData = await getAllItemFromStorage(movieLink)
     if (currentMoveLinkData && usedLocalData(currentMoveLinkData)) {
       onFetchCompleted('nowShowing', getUriPopulated(currentMoveLinkData.data.results, config, 'posterSizeForImageList'))
     } else {
       axios.get(movieLink).
         then( ({ data }) => {
           saveItemToStorageNoCheck(movieLink,data)
           onFetchCompleted('nowShowing', getUriPopulated(data.results, config, 'posterSizeForImageList'))

         }).catch(error => console.log(error.response))
     }
    
   } else {
    
    axios.get(uri)
     .then( async ({ data }) => {
       saveItemToStorageNoCheck(uri,data)
       onConfigFetched(data)
       console.log('Movie Link', movieLink)
       let currentMoveLinkData = await getAllItemFromStorage(movieLink)
       if (currentMoveLinkData && usedLocalData(currentMoveLinkData)) {
         onFetchCompleted('nowShowing', getUriPopulated(currentMoveLinkData.data.results, config, 'posterSizeForImageList'))
       } else {
         axios.get(movieLink).
           then(({ data }) => {
             saveItemToStorageNoCheck(movieLink, data)
             onFetchCompleted('nowShowing', getUriPopulated(data.results, config, 'posterSizeForImageList'))

           }).catch(error => console.log(error.response))
       }
     }).catch(error => console.log(error.response))
  }
    // axios.get(uri)
    //  .then( ({ data }) => {
    //    onConfigFetched(data)
    //   let uri = `${Constant.api_base_url}/movie/now_playing?${apiKey}&language=${language}&page=1`
    //   console.log('Movie Link', uri)
    //     axios.get(uri).
    //      then( ({ data }) => {
    //        onFetchCompleted('nowShowing', getUriPopulated(data.results, config, 'posterSizeForImageList'))

    //      }).catch(error => console.log(error.response))
    //  }).catch(error => console.log(error.response))

 }, 1000)
   
  }

  render() {
    return (
      <View style={[style.centerContentContainer, style.splashScreenBackground]}>
        <Avatar
          xlarge
          rounded
          containerStyle={{
          backgroundColor: primaryColor
        }}
          title='M'
          titleStyle={{
          fontWeight: '900',
          fontSize: 100
        }}/>
        <Text style={[style.appName, style.startupScreenTextProps]}>
          MovieDB
        </Text>
        <View style={{
          marginTop: 50,
          marginBottom: 50
        }}>
          <ActivityIndicator size='large' color={primaryColor}/>
        </View>
        <Text style={[style.titleText, style.startupScreenTextProps]}>
          For everyone in love with movies and TV Shows
        </Text>
      </View>
    )
  }
};

const mapStateToProps = state => ({config: state.configuration, settings: state.settings})

const mapDispatchToProps = dispatch => ({
  onFetchCompleted:  async (category, movies) => {
    dispatch(movieFetched(category, movies))
  },
  onConfigFetched: async (config) => {
    dispatch(configFetched(config))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
