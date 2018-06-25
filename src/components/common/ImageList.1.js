import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FlatList,
  Text, TouchableOpacity,
  ScrollView, StyleSheet,
  View
} from 'react-native'
import { TouchableImage, TouchableText } from './Touchable'
import CustomImage from '../../utilities/globalView'
import * as _ from 'lodash'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import * as  Progress from 'react-native-progress';
import Constant from '../../utilities/constants'
import style from '../../styles/light-theme'
import FastImage from 'react-native-fast-image';
export const imageData = (data) => {
   let imgList = []
  data && data.map((image, index) => {
    let obj = {}
    obj['url'] = _.isString(image) ? image.replace('/w185/', '/w500/') : image.uri.replace('/w185/', '/w500/')
    imgList.push(obj)
  })
   return imgList
}

const HorizontalImageList = (props) => {
  // custom isNeedSliced , isNeedShowFull
  let images = props.isNeedSliced ? ( props.images.length > 10 ?  props.images.slice(5) : props.images) : props.images
  let imgDetailsData = props.isNeedShowFull ? imageData(images) : []
  console.log('imgDetailsData', imgDetailsData)
  return (
  <View style={style.container}>
    <Title {...props} />
    <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.posterList}>
        {images.map((image, index) => (
        props.isTouchableImage
          ? <TouchableImage
            key={index}
            style={[style.imagePlaceholder, props.style]}
            onPress={() => props.onPress(image)}
              uri={_.isString(image) ? image : image.uri}
          />
          : 
          // <Image
          //   key={index}
          //   style={[style.imagePlaceholder, props.style]}
          //   source={{uri: _.isString(image) ? image : image.uri}}
          // />

            <FastImage
              source={{uri: props.isNeedShowFull ? (_.isString(image) ? image.replace('/w185/', '/w500/') : image.uri.replace('/w185/', '/w500/')) : (_.isString(image) ? image : image.uri)}}
              key={index}
              style={
                [style.imagePlaceholder, props.style]
              }
              resizeMode={FastImage.resizeMode.cover}
            />

          // <Image
          //      key={index}
          //   style={[style.imagePlaceholder, props.style]}
          //   source={{uri: _.isString(image) ? image : image.uri}}
          //   indicator={Progress.Pie}
          //   indicatorProps={{
          //     size: 10,
          //     borderWidth: 0,
          //     color: 'rgba(150, 150, 150, 1)',
          //     unfilledColor: 'rgba(200, 200, 200, 0.2)'
          //   }}
          //  />
          // < CustomImage 
          //    isNeedShowFull={props.isNeedShowFull}
          //   key = {
          //     index
          //   }
          //   styles = {
          //     [style.imagePlaceholder, props.style]
          //   }
          // linkSource = {
          //   {
          //     uri: props.isNeedShowFull ? (_.isString(image) ? image.replace('/w185/', '/w500/') : image.uri.replace('/w185/', '/w500/')) : (_.isString(image) ? image : image.uri)
          //   }
          // }
          //     imgDetailsData={imgDetailsData}
          // />



          
      ))}
    </ScrollView>
  </View>)
}

// TODO: See All should be of normatText. Nesting of text should fix it
// since TouchableText is involved, the situaion gets complicated.Fix this
const Title = (props) => (
  <View style={styles.titleContainer}>
    <Text style={[style.text, style.headingText]}>
      {props.title}
    </Text>
    {
      props.hasSeeAllOption
        ? <TouchableText
          onPress={() => props.onShowAll(props.title, props.images)}
          text='See All &gt;'
        />
        : null
    }
  </View>
)

Title.propTypes = HorizontalImageList.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  isTouchableButton: PropTypes.bool,
  hasSeeAllOption: PropTypes.bool,
  onPress: (props, thisProp) => {
    if (props['isTouchableButton'] &&
      (!props[thisProp] || typeof (props[thisProp]) !== 'function')) {
      return new Error('onPress is required when isTouchableButton is true!')
    } else {
      return null
    }
  },
  onShowAll: (props, thisProp) => {
    if (props['hasSeeAllOption'] &&
      (!props[thisProp] || typeof (props[thisProp]) !== 'function')) {
      return new Error('onShowAll is required when hasSeeAllOption is true!')
    } else {
      return null
    }
  }
}

// Note, Changing numColumns on the fly is not supported. Change the key prop
// on FlatList when changing the number of columns to force refresh
const FlatImageList = (props) => (
  <FlatList
    key={'dummy_key_' + props.numColumns}
    style={[props.style.bgColor]}
    numColumns={props.numColumns}
    data={props.images}
    renderItem={({item}) =>
    {
      
      return(
      <TouchableImage
        key={item.id}
        onPress={() => props.onPress(item)}
        style={[props.style.imageStyle, styles.flatList]}
        uri={`${Constant.api_img_url}/w185/${(item.poster_path || item.backdrop_path)}`}
      />)
    }
    }
    onEndReached={props.onEndReached}
    //removeClippedSubviews={false}
    //initialNumToRender={100}
    onEndReachedThreshold={1200}
    keyExtractor={(item, index) => index}
  />
)

FlatImageList.protoTypes = {
  images: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  numColumns: PropTypes.number.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ])
}

const styles = StyleSheet.create({
  // TODO: does ios have a standard? if so use that
  // Image size for poster size w92 on TMDB
  posterList: {
    flexDirection: 'row'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5
  },
  flatList: {
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',

  }
})

export {FlatImageList}
export default HorizontalImageList
