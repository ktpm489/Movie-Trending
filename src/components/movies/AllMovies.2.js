import React, { Component } from 'react'
import { Dimensions, StyleSheet,View, FlatList } from 'react-native'
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
import {TMDB_URL , TMDB_API_KEY } from '../../constants/api'
// return device width and height
const { height, width } = Dimensions.get('window')
const numColumns = parseInt(width / (92 + (5 * 2)))

class AllMovies extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isRefreshing: false,
      currentPage: 1,
      list: {
        results: []
      },
      dataSource : []

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
  _retrieveMoviesList(isRefreshed) {
    this.props.actions.retrieveMoviesList(this.type, this.state.currentPage).then(() => {

      this.setState({
         list : this.props.list,
         dataSource : this.props.list.results,
         isLoading : false
      })
    })
  }

  retrieveNextPage = () => {
      if (this.state.currentPage !== this.props.list.total_pages){
          this.setState({
            currentPage: this.state.currentPage + 1
          })
          let page;
          if (this.state.currentPage === 1){
            page = 2
            this.setState({currentPage : 2})
          } else {
            page = this.state.currentPage + 1
          }
        axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`).then(
          res => {
            const data = this.state.list.results
            const newData = res.data.results
            newData.map(( item, index) => data.push(item))
            this.setState({
              dataSource : this.state.list.results
            })
          }
        ).catch((err) => {console.log('nextpage', error )})
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
    console.log('updated', dataSource)
    return (
      isLoading ?
        <View style={styles.progresssBar}><ProgressBar /></View>
        :
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
          initialNumToRender={50}
          onEndReachedThreshold={1200}
          maxToRenderPerBatch={100}
          keyExtractor={(item, index) => index}
        />
    )
  }
}

const mapStateToProps = state => ({
  ...state.movies,
  config: state.configuration,
  list : state.moviesNew.list
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
