import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, FlatList, Button, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { selectedMovie } from '../../Actions'
import { NavigationActions } from 'react-navigation'
import style from '../../styles/light-theme'
import styles from '../../styles/MovieList'
import ProgressBar from '../customComponent/ProgressBar'
import axios from 'axios'
import CardItem from '../customComponent/CardItem/CardItem'
import *  as moviesAction from '../../Actions/MovieNewActions'
import { bindActionCreators } from 'redux'
import Constant from '../../utilities/constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatImageList } from '../common/ImageList'
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings, calculateRating } from '../../utilities/globalFunction'
import { LANGUAGE_KEY } from '../../utilities/constants'
// return device width and height
const { height, width } = Dimensions.get('window')
const numColumns = parseInt(width / (92 + (5 * 2)))
const iconShuffle = <Icon name="ios-shuffle" size={40} color="#3CCB3E" style= { {marginRight: 10}} />
class AllMovies extends Component {
 
  static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => params.handleSave  && params.handleSave()}>
          {iconShuffle}
          </TouchableOpacity>
      )
    }
  }


  

  
 

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isRefreshing: false,
      currentPage: 1,
      list: {
        results: []
      },
      isGridView : false,
      dataSource: []

    }
    this.type = this.getTypeParam(this.props.navigation.state.params.category.toCategory())
  }
  

  getTypeParam = (strParams) => {
    switch (strParams) {
      case 'nowShowing':
        return 'now_playing'
      case 'comingSoon':
        return 'upcoming'
      case 'popular':
        return 'popular'
      case 'showingToday':
        return 'airing_today'
      case 'topRated':
        return 'top_rated'
      default:
        return 'popular'
    }
  }

  componentWillMount = () => {
    this._retrieveMoviesList()
  }

  componentDidMount = () => {
    // await calculateRating()
    this.props.navigation.setParams({ handleSave: this.saveDetails });

  }
  saveDetails = () => {
    console.log('Save Details');
    this.setState({ isGridView: !this.state.isGridView })
  }
 
  shallowEqual = (objA, objB) => {
    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
      if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }

    return true;
  }

  shallowCompare = (instance, nextProps, nextState) => {
    return (
      !this.shallowEqual(instance.props, nextProps) ||
      !this.shallowEqual(instance.state, nextState)
    );
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.shallowCompare(this, nextProps, nextState)
  }

  _retrieveMoviesList(isRefreshed) {
    this.props.actions.retrieveMoviesList(this.type, this.state.currentPage).then(() => {
      console.log('RetriveMoviesList')
      this.setState({
        list: this.props.list,
        dataSource: this.props.list.results,
        isLoading: false
      })
    }).catch(error => {console.log('RetrieveMoviesList', error)})
  }

  retrieveNextPage = async () => {
    if (this.state.currentPage !== this.props.list.total_pages) {
      this.setState({
        currentPage: this.state.currentPage + 1
      })
      let page;
      if (this.state.currentPage === 1) {
        page = 2
        this.setState({ currentPage: 2 })
      } else {
        page = this.state.currentPage + 1
      }
      let settings = await getSettings(LANGUAGE_KEY);
      let link = `${Constant.TMDB_URL}/movie/${this.type}?api_key=${Constant.TMDB_API_KEY}&page=${page}&language=${settings}`
      // // SAVE STORE
      // axios.get(`${Constant.TMDB_URL}/movie/${this.type}?api_key=${Constant.TMDB_API_KEY}&page=${page}`).then(
      //   res => {
      //     const data = this.state.list.results
      //     const newData = res.data.results
      //     newData.map((item, index) => data.push(item))
      //     this.setState({
      //       dataSource: this.state.list.results
      //     })
      //   }
      // ).catch((err) => { console.log('nextpage', error) })

      let currentData = await getAllItemFromStorage(link)
      if (currentData && usedLocalData(currentData)) {
        console.log('Use current  Movie show Data', currentData)
        const newData = currentData.data.results;
        const data = this.state.list.results
        newData.map((item, index) => data.push(item))
        this.setState({
          dataSource: this.state.list.results
        })
      } else {
        axios.get(link).then(
        res => {
          saveItemToStorageNoCheck(link, res.data)
          const data = this.state.list.results
          const newData = res.data.results
          newData.map((item, index) => data.push(item))
          this.setState({
            dataSource: this.state.list.results
          })
        }
      ).catch((err) => { console.log('nextpage', error) })
     
    }
      this.setState({ isLoading: false })
  }
}


  renderItem = (item, index) => {
    const { onShowDetails } = this.props
    return (
      <CardItem
        info={item}
        onShowDetails={onShowDetails}
      />
    )
  }
  renderFooter = () => {
    return (
      <View style={{ height: 50 }}>
        <ProgressBar />
      </View>
    )
  }
  renderSeparator = () => (

    <View style={styles.seperator} />
  )
  render() {

    const { dataSource, isLoading } = this.state
    const { onShowDetails, categories, config } = this.props
    console.log('numberColumn', this.props.config.image.numColumns)
    return (
      isLoading ?
        <View style={styles.progressBar}><ProgressBar /></View>
        :
        !this.state.isGridView ?  
        <FlatList
          key={'dummy_key_' + numColumns}
          style={{
            backgroundColor: style.screenBackgroundColor,
            marginTop: 2,
          }}
          numColumns={1}
          data={dataSource}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.retrieveNextPage}
         // removeClippedSubviews={false}
          onEndReachedThreshold={120}
          keyExtractor={(item, index) => index}
        /> 
        : <FlatImageList
          numColumns={3}
          style={{
            bgColor: style.screenBackgroundColor,
            imageStyle: config.style.posterSize
          }}
          onEndReached={this.retrieveNextPage}
          onEndReachedThreshold={1200}
          images={dataSource}
          onPress={onShowDetails.bind(this)}
        />
    )
  }
}

const mapStateToProps = state => ({
  ...state.movies,
  config: state.configuration,
  list: state.moviesNew.list
})

const mapDispatchToProps = dispatch => ({
  onShowDetails: (movie) => {
    dispatch(selectedMovie(movie))
    dispatch(NavigationActions.navigate({
      routeName: 'MovieDetails',
      params: {
        name: movie.name,
        id: movie.id
      }
    }))
  },
  actions: bindActionCreators(moviesAction, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(AllMovies)
