import React, {Component} from 'react';
import { 
  ActivityIndicator,
  Button,
  ScrollView, StyleSheet,
  Text,
  View,
  Linking,
  Platform,
  Dimensions
} from 'react-native';
import axios from 'axios'

import BackgroundImage from '../common/BackgroundImage';
import ShowOverview from '../common/ShowOverview';
import HorizontalImageList from '../common/ImageList';
import CastList from '../common/CastList'
import TrailerList from '../common/TrailerList';
import CastDetails from '../common/CastDetails';
import Constant from '../../utilities/constants'
import { getUriPopulated } from '../../utilities/utils';
import style, {marginTop} from '../../styles/light-theme';
import MovieSimilar from './movieDetailComponent/movieFlatList'
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view'
const heightScreen = Dimensions.get('window').height
class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      blur: 0,
      currentReviewPage: 1,
      reviewPageResults :[],
      isLoadingInfo : true,
      isLoadingReview: true,
      isLoadingSimilar: true,
      currentSimilarPage: 1,
      similarPageResults : [] ,
      onEndReachedCalledDuringMomentum : true
     
    };
    
  }

  // https://stackoverflow.com/questions/47910127/flatlist-calls-enendreached-when-its-rendered?rq=1
  componentDidMount() {
    console.error("Override!!");
  }

  getSpecialComponent() {
    console.error("Override!!");
  }

  fetchDetails = (imagesUri, peopleUri, movieId) => {
    const { onDetailsFetched, currentTab, config } = this.props;

    axios.get(imagesUri)
      .then(  ({data}) => {
        const {images, videos} = data;
        data.images = getUriPopulated(images.backdrops, config, 'backdropSize');
        data.videos = this.formVideoUrls(videos.results) 
        onDetailsFetched(data, 'imagesAndVideos', currentTab);
      }).catch((error) => { console.error(error.response); });

    axios.get(peopleUri)
      .then( ({data}) => {
        const {crew, cast} = data;
        const people = {
          'directors': getUriPopulated(crew.filter((member) => 
            member.job === 'Director'), config, 'profileSize'),
          'casts': getUriPopulated(cast.sort((a, b) => a.order - b.order), config, 'profileSize')
        }
        onDetailsFetched(people, 'directorsAndCast', currentTab);
      }).catch((error) => { console.error(error.response); });

  }

  /**
   * Forms video urls
   */
  formVideoUrls =  (videos) =>  {
    const filteredVideos =   videos.filter((video) => video.site === 'YouTube');
    return filteredVideos.map((video) => {
      return {
        name: video.name,
        url: `https://www.youtube.com/embed/${video.key}?&autoplay=1`
      };
    });
  }

  showCastDetails(cast) {
    this.props.onCastSelected(cast, this.props.currentTab);
  }

  playVideo(url) {
    // if (Platform.OS === 'ios') {
      this.props
        .navigation
        .navigate('VideoPlayer', {url});
    // } else if (Platform.OS === 'android') {
    //   Linking
    //     .openURL(url)
    //     .catch(err => console.error('An error occurred', err));
    // }
  }

  handleOnScroll = (e) => {
    const yOffset = e.nativeEvent.contentOffset.y;
    const blurConstant = 10;
    // If Y scroll position is more than detail poster then blur it
    if (yOffset > marginTop) {
      this.setState({
        opacity: 0,
        blur: blurConstant
      })
    } else {
      const opacity = 1 - (yOffset/marginTop);
      const blur = parseInt((yOffset * blurConstant ) / marginTop, 10);
      this.setState({
        opacity,
        blur
      })
    }
  }

  retrieveSimilarMovieList() {
    this.props.actions.retrieveMovieSimilarDetails(this.props.details.id, this.state.currentSimilarPage).then(()=>{
      console.log('Retrieve Similar Movie list')
      this.setState({
        similarPageResults: this.props.similarmovies.results,
        isLoadingSimilar : false,
        currentSimilarPage: 1
      })
    }).catch(error => { console.log('Retrive Similar movie list error', error )})
  }



  retrieveSimilarNextPage =  () => {
  //  if (!this.state.onEndReachedCalledDuringMomentum) {
   // this.setState({ firstSimilarTime : false})
   console.log('Read Next Page')
    if (this.state.currentSimilarPage <= this.props.similarmovies.total_pages) {
      
      let page;
      if (this.state.currentSimilarPage === 1) {
        page = 2
        this.setState({ currentSimilarPage: 2 })
      } else {
        page = this.state.currentSimilarPage + 1
      }
      this.setState({ currentSimilarPage: this.state.currentSimilarPage + 1 })
      axios.get(`${Constant.TMDB_URL}/movie/${this.props.details.id}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`).then(
        res => {
          const data = this.state.similarPageResults
          const newData = res.data.results
          
          console.log('New Data', newData[newData.length - 1].id , data[data.length - 1].id)
          if (newData && newData[newData.length - 1] && newData[newData.length - 1].id && newData[newData.length - 1].id !== data[data.length-1].id ){
          newData.map((item, index) => data.push(item))
          this.setState({
            similarPageResults: data,
            // currentPage: this.state.currentSimilarPage + 1
          })
        }
        }
      ).catch((err) => { console.log('nextSimilarMoviepage', err) })
   // }
   // this.setState({onEndReachedCalledDuringMomentum : true})
  }
}


  onMomentumScrollBegin = ()=>{
  //  this.setState({ onEndReachedCalledDuringMomentum : false })
  }

  render() {
    const {
      config: {
        image: { secureBaseUrl, posterSizeForBackground },
        style: { backdropSize }
      },
      details: {
        title, images, videos, release_date, casts, first_air_date, runtime,
        vote_average, overview, poster_path
      }
    } = this.props;
    const bgImage = `${secureBaseUrl}${posterSizeForBackground}/${poster_path}`;
    return (
      <View style={[{ flex: 1 }, style.screenBackgroundColor]}>
        <BackgroundImage 
          uri={bgImage} 
          opacity={this.state.opacity}
          blur={this.state.blur}/>
        <ScrollView style={{flex: 1}}>
          <View style={[style.detailsContainerEdit]}>
          <ScrollableTabView
            style={[style.detailsContainerEdit]}
            initialPage={0}
            ref={(ref) => { this.scrollableTabView = ref; }}
            renderTabBar={() => <DefaultTabBar />}
          >
            <View tabLabel='Information ' style={{ flex: 1  }}>
            <Text style={[style.text, style.titleText]}>
              {title}
            </Text>

            <ShowOverview
              date={release_date || first_air_date || ''}
              runtime={runtime || 100}
              ratings={vote_average}
              />

            <Text style={[style.text, style.normalText]}>
              {overview}
            </Text>

            <HorizontalImageList
              title="Photos"
              isNeedShowFull={true}
              images={images || []}
              style={backdropSize}
            />

            <TrailerList 
              videos={videos || []} 
              playVideo={this.playVideo.bind(this)}
            />

            {this.getSpecialComponent()} 

            <CastList
              title="Cast"
              items={casts || []}
              onPress={this.showCastDetails.bind(this)}
            />
          </View>

           {/*** Tab Two ***/}
            <View tabLabel='Similar Movie' style={{flex: 1}}>
              {/** isLoading, dataSource, retrieveNextPage */}
              <MovieSimilar
                retrieveNextPage={this.retrieveSimilarNextPage}
                dataSource={this.state.similarPageResults}
                isLoading = {this.isLoadingReview}
                onMomentumScrollBegin={this.onMomentumScrollBegin}
                onShowDetails={this.props.onShowDetails.bind(this)}
              />
            </View>
          </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Details;
