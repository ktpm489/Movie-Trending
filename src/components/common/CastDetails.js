import React, {Component} from 'react'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {View, Text, ActivityIndicator, ScrollView} from 'react-native'
import axios from 'axios'
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import HorizontalImageList from './ImageList'
import Constant from '../../utilities/constants'
import {getUriPopulated} from '../../utilities/utils'
import {
  castDetailsFetched, 
  fetchingCastDetails, 
  selectedTvShow, 
  selectedMovie, 
  searchItemDetailsFetched, 
  fetchCastDetails} from '../../Actions'

import style, {primaryColor, StackNavHeaderStyles} from '../../styles/light-theme'

class CastDetails extends Component {
  componentDidMount () {
    this.props.fetchCastDetails(this.props.details.id)

    const baseUrl = Constant.api_base_url
    const apiKey = Constant.api_key
    const castDetailUrl = `/person/${this.props.details.id}`
    const castKnownForUrl = `${castDetailUrl}/movie_credits`
    const {
      config,
      currentTab,
      config: {
        image: {
          secureBaseUrl,
          posterSizeForBackground
        }
      }
    } = this.props

    if (currentTab !== 'Search') // search tab already has the data available
    { this.props.onFetching(currentTab) }

    // fetch Cast Details
    axios.get(`${baseUrl}${castDetailUrl}?${apiKey}`)
      .then(({data}) => {
        data.imageSrc = `${secureBaseUrl}${posterSizeForBackground}${data['profile_path']}`
        this.props.onDetailsFetched(data, 'bio', this.props.currentTab)
      }).catch((error) => {
        console.error(error.response)
      })

    // fetch Casts other movies
    axios.get(`${baseUrl}${castKnownForUrl}?${apiKey}`)
      .then(({data}) => {
        const movieList = [
          ...data.cast,
          ...data.crew
        ]
        this.props.onDetailsFetched(getUriPopulated(movieList, config, 'posterSizeForImageList'),
          'movies',
          this.props.currentTab)
      }).catch((error) => {
        console.error(error)
      })
  }

  showDetails(item) {
    const { onShowDetails, currentTab, searchIndex } = this.props
    onShowDetails(item, currentTab, searchIndex)
  }

  render () {
    const {isFetching, details, config} = this.props

    if (isFetching) {
      return (
        <ScrollView style={style.screenBackgroundColor}>
          <ActivityIndicator size='large' color={primaryColor} />
        </ScrollView>
      )
    }

    return (
      <View
        style={[{flex: 1}, style.screenBackgroundColor]}>
        <ScrollView style={style.screenBackgroundColor}>
          <View style={style.castBackground}>
            {/* <Image
              style={[style.avatarSize, style.avatarBigSize]}
              source={{
                uri: details.imageSrc
              }} /> */}

            <Image
              style={[style.avatarSize, style.avatarBigSize]}
              source={{
                uri: details.imageSrc
              }}
              indicator={Progress.Pie}
              indicatorProps={{
                size: 10,
                borderWdth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
              }}
               />
            {/* <CustomCachedImage
              component={Image}
              source={{ uri: details.imageSrc }}
              indicator={ProgressBar}
              style={[style.avatarSize, style.avatarBigSize]} /> */}
            <Text style={[style.text, style.titleText]}>
              {details.name}
            </Text>
            <Text style={[style.text, style.normalText]}>
              {details.birthday}
            </Text>
            <Text style={[style.text, style.normalText]}>
              {details.place_of_birth}
            </Text>
          </View>

          <View style={[style.castBiography]}>
            <Text style={[style.text, style.normalText]}>
              {details.biography}
            </Text>

            <HorizontalImageList
              isTouchableImage
              title='Known For'
              style={config.style.posterSize}
              onPress={this.showDetails.bind(this)}
              images={details.movies || []} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  const currentTab = state.tabNavHelper.currentTab
  const mapScreenToStateProps = {
    'Movies': 'movies',
    'TvShows': 'tvShows',
    'Search': 'search'
  }

  return {
    config: state.configuration,
    currentTab,
    searchIndex: (currentTab === 'Search') && state.search.selectedIndex,
    ...state[mapScreenToStateProps[currentTab]].cast,
  }
}

const mapDispatchToProps = dispatch => ({
  onFetching: (currentTab) => {
    dispatch(fetchingCastDetails(currentTab))
  },
  onDetailsFetched: (details, category, currentTab) => {
    if (currentTab === 'Search') {
      dispatch(searchItemDetailsFetched(details, category))
    } else {
      dispatch(castDetailsFetched(details, category, currentTab))
    }
  },
  onShowDetails: (item, currentTab, searchIndex) => {
   let  routeName = (currentTab === 'Movies') ? 'MovieDetails' : 'TvShowDetails'

    if (currentTab === 'Search' && searchIndex) {
      if (searchIndex === 0) {
        routeName = 'MovieDetails'
      } else if (searchIndex === 1) {
        routeName = 'TvShowDetails'
      } else {
        // TODO: How do we decide ?
      }
    }
  let  funcToCall = (routeName === 'MovieDetails') ? selectedMovie : selectedTvShow

    dispatch(funcToCall(item))
    dispatch(NavigationActions.navigate({
      routeName: routeName,
      params: {
        name: item.name || item.original_title,
        id: item.id
      }
    }))
  },
  fetchCastDetails
})

export default connect(mapStateToProps, mapDispatchToProps)(CastDetails)
