import {Dimensions} from 'react-native'
import Config from 'react-native-config';

const {height, width} = Dimensions.get('screen')
const tabBarHeight = 54
const APP_CONSTANT = {
  api_base_url: Config.API_ENDPOINT,
  api_key: `api_key=${Config.API_KEY}`,
  lan_region: '&language=IN-hi&region=IN&page=1',
  goldenRatio: 1.618,
  width,
  height: height - (tabBarHeight * 2),
  api_img_url: 'https://image.tmdb.org/t/p',
  TMDB_URL:  'https://api.themoviedb.org/3',
  TMDB_IMG_URL: 'https://image.tmdb.org/t/p',
  TMDB_API_KEY: '87dfa1c669eea853da609d4968d294be',
  YOUTUBE_URL: 'https://www.googleapis.com/youtube/v3/videos',
  YOUTUBE_API_KEY: 'AIzaSyDdBQ3SHC_M9B8Js1g_SBTqgj-26qP3hF8'

}

export default APP_CONSTANT
