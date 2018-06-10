import React, {Component} from 'react'
import {WebView, StyleSheet ,Platform} from 'react-native'

import style from '../../styles/light-theme'
import Orientation from 'react-native-orientation'
import YouTube from 'react-native-youtube'
import {
  getIdYoutubeLink
} from '../../utilities/globalFunction'
const ISIOS = Platform.OS === 'ios'
export default class VideoPlayer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: this.props.navigation.state.params.url
    }
  }

  componentWillMount () {
    // Orientation.lockToLandscape()
   // Orientation.lockToPortrait()
  }

  componentWillUnmount () {
  //  Orientation.lockToPortrait()
  }

  render () {

    let youtubeId = getIdYoutubeLink(this.state.url)
    let renderData = ISIOS ? (<WebView
                    style = {
                      style.flexContainer
                    }
                    javaScriptEnabled
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction = {
                      false
                    }
                    source = {
                      {
                        uri: this.state.url
                      }
                    }
                    // source={{html: `<iframe width="560" height="315"
                    // src="https://www.youtube.com/embed/D6Ac5JpCHmI?&autoplay=1&controls=1"></iframe>` }}
                    />
                  ) : (
                    < YouTube
                    apiKey = "AIzaSyDdBQ3SHC_M9B8Js1g_SBTqgj-26qP3hF8"
                    videoId = {youtubeId} // The YouTube video ID
                    play = {
                      true
                    } // control playback of video with true/false
                    fullscreen = {
                      false
                    } // control whether the video should play in fullscreen or inline
                    loop = {
                      true
                    } // control whether the video should loop when ended

                    onReady = {
                      e => this.setState({
                        isReady: true
                      })
                    }
                    onChangeState = {
                      e => this.setState({
                        status: e.state
                      })
                    }
                    onChangeQuality = {
                      e => this.setState({
                        quality: e.quality
                      })
                    }
                    onError = {
                      e => this.setState({
                        error: e.error
                      })
                    }

                    style = {
                      style.flexContainer
                    }
                    />
                  )
    return  renderData
    
  }
}
