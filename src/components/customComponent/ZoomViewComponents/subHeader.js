import React from 'react'
import { View, TouchableOpacity ,Platform } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import Notification from 'react-native-in-app-notification';
const icCustomBack = <Ionicons name='ios-arrow-back' size={30} color={'#FEFEFE'} />
const icDownload = <Ionicons name='ios-download-outline' size={30} color={'#FEFEFE'} />
const ISIOS = Platform.OS ==='ios'
const zoomHeader = (props) => {
  const { showHeader, index, data, animationEnd, onClickBack, onClickDownload, setNotificatioRefs } = props
  const clickDownloadItem = () => {onClickDownload(index)}
  const showData = (
    <Animatable.View onAnimationEnd={animationEnd} animation='fadeOut'
      duration={1000} delay={3000}
      style={styles.mainHeaderContainer}>
      <TouchableOpacity onPress={onClickBack} activeOpacity={1} style={styles.backBtn}>
        {icCustomBack}
      </TouchableOpacity>
      <Animatable.Text animation='fadeOut' delay={3000} duration={1000}
        style={styles.txtTitle}>{(index + 1) + ' ' + 'of' + ' ' + data.length}</Animatable.Text>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={clickDownloadItem} activeOpacity={1} style={styles.backBtn}>
          {icDownload}
      </TouchableOpacity>
      </View>
    {<Notification ref={setNotificatioRefs}  closeInterval={1000} /> }
    </Animatable.View>
  )
  const hideData = (<View style={{opacity : 0 }}> 
    {<Notification ref={setNotificatioRefs} closeInterval={1000} />}
    </View>
  )
  return (
    showHeader ? showData : hideData
  )
}
export default (zoomHeader)
