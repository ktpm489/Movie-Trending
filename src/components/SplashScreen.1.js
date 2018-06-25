import React, {Component} from 'react'
import {ActivityIndicator, Text, View} from 'react-native'
import * as _ from 'lodash'
import {connect} from 'react-redux'
import axios from 'axios'

import {configFetched, movieFetched} from '../Actions'
import {Avatar} from 'react-native-elements'
import {getUriPopulated} from '../utilities/utils'
import Constant from '../utilities/constants'

// import style, {primaryColor} from '../styles/light-theme'
import style, {primaryColor} from '../styles/light-theme'

class SplashScreen extends Component {
  componentDidMount = async () => {
    const apiKey = Constant.api_key
    let uri = `${Constant.api_base_url}/configuration?${apiKey}`
    const {onFetchCompleted, onConfigFetched, config, settings: {
        language
      }} = this.props
 setTimeout(async () => {

   await axios.get(uri)
     .then(async ({ data }) => {
       onConfigFetched(data)
      let uri = `${Constant.api_base_url}/movie/now_playing?${apiKey}&language=${language}&page=1`
      let  uriMoviePopular = `${Constant.api_base_url}/movie/popular?${apiKey}&language=${language}&page=1`
      let  uriMovieCommingSoon = `${Constant.api_base_url}/movie/comingSoon?${apiKey}&language=${language}&page=1`
       await axios.get(uri).
         then(async ({ data }) => {
           onFetchCompleted('nowShowing', getUriPopulated(data.results, config, 'posterSizeForImageList'))
        //   onFetchCompleted('comingSoon', getUriPopulated(data.results, config, 'posterSizeForImageList'))
          //  onFetchCompleted('popular', getUriPopulated(data.results, config, 'posterSizeForImageList'))
          // await this.fetch('comingSoon', '/movie/upcoming')
         //  await this.fetch('popular', '/movie/popular')
         }).catch(error => console.log(error.response))
      //  await axios.get(uriMoviePopular).
      //    then(async ({ data }) => {
      //      onFetchCompleted('popular', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      //   onFetchCompleted('comingSoon', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      //  onFetchCompleted('popular', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      // await this.fetch('comingSoon', '/movie/upcoming')
      //      //  await this.fetch('popular', '/movie/popular')
      //    }).catch(error => console.log(error.response))
      //  await axios.get(uriMovieCommingSoon).
      //    then(async ({ data }) => {
      //      onFetchCompleted('comingSoon', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      //   onFetchCompleted('comingSoon', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      //  onFetchCompleted('popular', getUriPopulated(data.results, config, 'posterSizeForImageList'))
      //      // await this.fetch('comingSoon', '/movie/upcoming')
      //      //  await this.fetch('popular', '/movie/popular')
      //    }).catch(error => console.log(error.response))
     }).catch(error => console.log(error.response))

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
