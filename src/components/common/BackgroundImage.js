import React, {
  Component
} from 'react'
import {
  StyleSheet,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import {
  CustomCachedImage
} from 'react-native-img-cache'
// import Image from 'react-native-image-progress'
// import ProgressBar  from 'react-native-progress/Bar'
import Image from 'react-native-image-progress';
import CustomImage from '../../utilities/globalView'
import * as Progress from 'react-native-progress';
const BackgroundImage = (props) => {
  return (
    // <Image
    //   // style={[Style.absoluteImage, {opacity: props.opacity}]}
    //   style={[Style.absoluteImage]}
    //   source={{uri: props.uri}}
    //   // blurRadius={props.blur || 0}
    // />
    // <CustomCachedImage
    //   component={Image}
    //   source={{ uri : props.uri}}
    //   style= {[Style.absoluteImage, {opacity : props.opacity}]}
    //   indicator ={ProgressBar}
    ///>
    // <Image
    //   source={{ uri: props.uri }}
    //   indicator={Progress.Pie}
    //   indicatorProps={{
    //     size: 30,
    //     borderWidth: 0,
    //     color: 'rgba(150, 150, 150, 1)',
    //     unfilledColor: 'rgba(200, 200, 200, 0.2)'
    //   }}
    //   style={[Style.absoluteImage, { opacity: props.opacity }]} />
    <CustomImage styles = {
      [Style.absoluteImage, {
        opacity: props.opacity
      }]
    }
    linkSource = {
      {
        uri: props.uri
      }
    }/>
  )
}

BackgroundImage.propTypes = {
  uri: PropTypes.string.isRequired,
  opacity: PropTypes.number,
  blur: PropTypes.number
}

const Style = StyleSheet.create({
  absoluteImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default BackgroundImage