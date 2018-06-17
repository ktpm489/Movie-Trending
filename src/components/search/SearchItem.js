import React, { Component} from 'react'
import {View, Text} from 'react-native'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import CustomImage from '../../utilities/globalView'
import ProgressBar from 'react-native-progress/Bar';
import style from '../../styles/light-theme'
class SearchItem extends Component {

  render() {
    const { item, config } = this.props
   // console.log('itemRender', item)
    const { secureBaseUrl, profileSize, posterSizeForImageList } = config.image
    const { name, title, media_type, profile_path, poster_path } = item
    let size = posterSizeForImageList
    let path = poster_path
    if (media_type === 'person') {
      size = profileSize
      path = profile_path
    }
  // const mediaType = media_type.toUpperCase()
    const uri = `${secureBaseUrl}${size}${path}`
    // console.log('uri ', uri)

    return (
      <View style={style.searchItem}>
        <View style={[style.searchItemImage, style.imagePlaceholder]}>
          {/* <Image source={{uri}} style={style.searchItemImage} /> */}

          {/* <CustomCachedImage
          component={Image}
          indicator={ProgressBar}
          source={{ uri }} style={style.searchItemImage} /> */}
          < CustomImage styles={
            style.searchItemImage
          }
            linkSource={
              {
                uri
              }
            }
          />
        </View>
        <View style={style.searchItemData}>
          <Text style={[style.text, style.headingText]}>{name || title}</Text>
          {/* <Text style={[style.text, style.normalText]}>{mediaType}</Text> */}
        </View>
      </View>
    )
  }
  
}
export default SearchItem
