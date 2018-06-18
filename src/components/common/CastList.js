import React, {Component} from 'react'
import {
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import CustomImage from '../../utilities/globalView'
import * as Progress from 'react-native-progress';
import PropTypes from 'prop-types'

import style from '../../styles/light-theme'

const CastList = (props) => {
  return (
    <View>
      <Text style={[style.text, style.headingText, style.detailHeadings]}>
        {props.title}
      </Text>
      <ScrollView horizontal>
        {props
          .items
          .map((item, index) => (
            <TouchableOpacity
              key={index}
              style={style.avatarContaier}
              onPress={() => props.onPress(item)}
            >
              {/* <Image
                style={style.avatarSize}
                source={{
                  uri: item.uri
                }} /> */}
              {/* <CustomCachedImage
                component={Image}
                source={{ uri: item.uri }}
                indicator={ProgressBar}
                style={style.avatarSize} /> */}
              {/* <Image
                style={style.avatarSize}
                source={{
                  uri: item.uri
                }} 
                indicator={Progress.Pie}
                indicatorProps={{
                  size: 10,
                  borderWidth: 0,
                  color: 'rgba(150, 150, 150, 1)',
                  unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}/> */}
                < CustomImage styles = {
                  style.avatarSize
                }
                isNeedShowFull={false}
                linkSource = {
                  {
                   uri: item.uri
                  }
                }
                />
              <Text
                style={[style.text, style.normalText, style.avatarText]}
                numberOfLines={2}
                ellipsizeMode='tail'>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  )
}

export default CastList
