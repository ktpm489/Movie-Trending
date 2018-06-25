import React from 'react'
import {Text, View, TouchableOpacity ,Image} from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import { getLinkImgYoutube } from '../../utilities/globalFunction'
import styles from '../../styles/light-theme'
import CustomImage from '../../utilities/globalView'
const TrailerItem = ({style, video, onPlay}) => {
  let imageLink = getLinkImgYoutube(video.url)
 // console.log('Return ImageLink', imageLink)
 // console.log(' style.backdropSize', JSON.stringify(style.backdropSize))
  const dataSize = style.backdropSize
  // console.log(dataSize.margin , dataSize.width)
  return (
    <View>
      <Text style={[styles.text, styles.normalText, styles.trailerTitle , {width : dataSize.width}]} numberOfLines={1}>
        {video.name}
      </Text>
      <TouchableOpacity onPress={() => { onPlay(video.url) }}>
        <View
          style = {
            [style.backdropSize, styles.centerContentContainer, styles.trailerContainer, 
              {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent :'center',
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]
          } >
          {/* <Icon
            name='youtube-play'
            type='font-awesome'
            size={50}
            color='#ff0000'
            style = {
              [style.trailerPlayIcon, {
                position: 'absolute',
                alignSelf: 'center',
                zIndex: 999,
                elevation: 2
              }]
            }
            /> */}
            {/* <CustomImage
            styles = {
              [styles.imagePlaceholder]
            }
            linkSource = {
              {
                uri: imageLink
              }
            }/> */}

            < CustomImage
             styles = {[style.backdropSize]}
             linkSource = {
               {
                 uri: imageLink
               }
             }
             isYoutubeIcon= {true}
             />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const mapStateToProps = state => ({
  style: state.configuration.style
})
export default connect(mapStateToProps)(TrailerItem)
