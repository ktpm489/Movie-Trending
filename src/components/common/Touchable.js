import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text, TouchableOpacity
} from 'react-native'
import {Image} from 'react-native'
import { CachedImage, CustomCachedImage } from "react-native-img-cache";
import CustomImage from '../../utilities/globalView'
// import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import ProgressBar from 'react-native-progress/Bar';
import style from '../../styles/light-theme'
import { width, height } from '../../components/customComponent/ZoomViewComponents/globalStyles'
export const TouchableImage = (props) => (
  <TouchableOpacity
    onPress={() => props.onPress()}>
    {/* <Image
      style={props.style}
      source={{uri: props.uri}}
    /> */}
    {/* <Image
      style={props.style}
      source={{ uri: props.uri }}
      indicator={Progress.Pie}
      indicatorProps={{
        size: 10,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }} /> */}
      {/* < CustomImage styles = {
        props.style
      }
      linkSource = {
        {
          uri: props.uri
        }
      }
      /> */}

    <CachedImage
      style={[props.style, { width: width(30) }]}
      source={{ uri: props.uri }} mutable/>  
    {/* <CustomCachedImage
      component={Image}
      style={[props.style, { width: width(30) }]}
      source={{ uri: props.uri }} mutable/>  */}
    {/* <CustomCachedImage
      component={Image}
      source={{ uri: props.uri }}
      indicator={ProgressBar}
      style={props.style} 
       mutable/> */}
  </TouchableOpacity>
)

TouchableImage.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
  ]).isRequired,
  uri: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export const TouchableText = (props) => (
  <TouchableOpacity onPress={() => props.onPress()} style={style.textStickToBottom}>
    <Text style={[style.text, style.normalText]}>
      {props.text}
    </Text>
  </TouchableOpacity>
)

TouchableText.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
