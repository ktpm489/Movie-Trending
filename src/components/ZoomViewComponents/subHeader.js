import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icCustomBack } from 'common/globalIcon'
import styles from './styles'
import I18n from 'assets/Lang'
const zoomHeader = (props) => {
  const { showHeader, index, data, animationEnd, onClickBack } = props
  const showData = (
    <Animatable.View onAnimationEnd={animationEnd} animation='fadeOut'
      duration={1000} delay={3000}
      style={styles.mainHeaderContainer}>
      <TouchableOpacity onPress={onClickBack} activeOpacity={1} style={styles.backBtn}>
        {icCustomBack}
      </TouchableOpacity>
      <Animatable.Text animation='fadeOut' delay={3000} duration={1000}
        style={styles.txtTitle}>{(index + 1) + space + I18n.t('Initial.of') + space + data.length}</Animatable.Text>
      <View style={styles.rightView}></View>
    </Animatable.View>
  )
  const hideData = (<View style={styles.mainHeaderContainer} />)
  return (
    showHeader ? showData : hideData
  )
}
export default (zoomHeader)
