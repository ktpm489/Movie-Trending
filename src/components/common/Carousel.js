import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Dimensions,
//Image,
  ScrollView, StyleSheet,
  Text, TouchableOpacity,
  View
} from 'react-native'

import { CustomCachedImage } from "react-native-img-cache";
import CustomImage from '../../utilities/globalView'
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import * as _ from 'lodash'
import style from './../../styles/styles'

class Carousel extends Component {
  componentDidMount () {
    this.currentIndex = 0

    const scrollNext = () => {
      const children = _.get(this, 'scrollView.props.children', false)
      const {width} = this.props.carouselStyle

      if (children) {
        if ((this.currentIndex + 1) < children.length) {
          this.currentIndex += 1
        } else {
          this.currentIndex = 0
        }
      }
      this.scrollView &&
        this.scrollView.scrollTo({x: this.currentIndex * width, y: 0, animated: false})
      clearTimeout(this.scrollTimeout)
      this.scrollTimeout = setTimeout(scrollNext, 5000)
    }
    scrollNext()
  }

  componentDidUpdate () {
    const {width} = this.props.carouselStyle
    this.scrollView &&
      this.scrollView.scrollTo({x: this.currentIndex * width, y: 0, animated: false})
  }

  componentDidUnMount () {
    clearTimeout(this.scrollTimeout)
  }

  render () {
    const { onPress, images, carouselStyle } = this.props
    return (
      <ScrollView
        horizontal
        pagingEnabled
        ref={ref => this.scrollView = ref}
        showsHorizontalScrollIndicator={false}
        style={style.flexContainer}
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.posterSize}
            onPress={() => onPress(image)}>
            <ImageWithTitle image={image} style={carouselStyle} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    )
  }
}

const ImageWithTitle = (props) => (
  <View>
     {/* <Image
      style={props.style}
      source={{uri: props.image.uri}}
    />  */}
    {/* <Image
      style={props.style}
      source={{ uri: props.image.uri }}
      indicator={Progress.Pie}
      indicatorProps={{
        size: 10,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }} /> */}

      < CustomImage styles = {
        props.style
      }
      linkSource = {
        {
          uri: props.image.uri
        }
      }
      />
    {/* <CustomCachedImage
      component={Image}
      indicator={ProgressBar}
      style={props.style}
      source={{ uri: props.image.uri }} /> */}
    <View style={styles.absoluteTitle}>
      <Text style={[style.titleText, styles.titleText]}>
        {props.image.original_title || props.image.original_name}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  absoluteTitle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  titleText: {
    fontSize: 20,
    backgroundColor: 'transparent',
    color: 'white'
  }
})

const mapStateToProps = state => ({carouselStyle: state.configuration.style.carousel})
export default connect(mapStateToProps)(Carousel)
