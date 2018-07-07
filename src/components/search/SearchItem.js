import React, { Component} from 'react'
import {View, Text} from 'react-native'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import CustomImage from '../../utilities/globalView'
import ProgressBar from 'react-native-progress/Bar';
import style from '../../styles/light-theme'
class SearchItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item : null
    }
  }
  componentWillMount() {
    const { item } = this.props
    this.setState({item : item })
  }

  componentWillReceiveProps(nextProps) {
    const { item } = nextProps

    this.setState({ item })
  }

  // todo component check component update
  shouldComponentUpdate(nextProps, nextState) {
    const { item } = nextState
    const { item : oldItem  } = this.state

    // If "item.id"  is different, then update
    return item.id !== oldItem.id
  }

  render() {
    const { config } = this.props
    const { item} = this.state
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
