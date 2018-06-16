import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import style from './../../styles/styles'
import CustomImage from '../../utilities/globalView'
const EpisodeItem = ({data, config}) => {
  const {name, overview, still_path, episode_number} = data
  console.log('EpisodeItem', data)
  const {secureBaseUrl, stillSize} = config.image
  const episodeImg = `${secureBaseUrl}${stillSize}/${still_path}`

  return (
    <View style={style.episodeItem}>
      <View style={style.episodePosterContainer}>
         {/* <Image
          style={style.episodePoster}
          source={{uri: episodeImg}}
        />  */}
        {/* <CustomCachedImage
          component={Image}
          indicator={ProgressBar}
          style={style.episodePoster}
          source={{ uri: episodeImg }} /> */}
           < CustomImage styles = {
           style.episodePoster
          }
          linkSource = {
            {
             uri: episodeImg
            }
          }
          /> 
      </View>
      <View style={[style.episodeDesc]}>
        <Text style={[style.text, style.subHeadingText, { color: 'gray' }]}>{name}</Text>
        <Text style={[style.secondaryText, style.normalText, { color: 'gray' }]}>Episode #{episode_number}</Text>
        <Text style={[style.text, style.normalText, { color: 'gray' }]}>{overview}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  config: state.configuration
})

export default connect(mapStateToProps)(EpisodeItem)
