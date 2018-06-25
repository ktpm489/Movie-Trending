import React, {Component} from 'react'
import Details from '../base/DetailsMovieCustom'
import Constant from '../../utilities/constants'
import CastList from '../common/CastList'
import { connect } from 'react-redux'
import {
  castSelected,
  searchItemDetailsFetched,
  movieDetailsFetched
} from '../../Actions'
import *  as moviesAction from '../../Actions/MovieNewActions'
import { bindActionCreators } from 'redux'
import { NavigationActions } from 'react-navigation'
import { selectedMovie } from '../../Actions'
class MovieDetails extends Details {

  componentWillMount = () => {
   // this.retrieveSimilarMovieList()
  };
  componentDidMount = async () => {
    const baseUrl = Constant.api_base_url
    const apiKey = Constant.api_key
    const movie_url = '/movie/'
    const appendResponse = 'append_to_response=videos,images'
    const movieId = this.props.details.id
    console.log('moviedID', movieId)
    const movieUrl = `${baseUrl}${movie_url}${movieId}?${apiKey}&${appendResponse}`
    const movieCreditsUrl = `${baseUrl}${movie_url}${movieId}/credits?${apiKey}`

   await this.fetchDetails(movieUrl, movieCreditsUrl , movieId)
    //  this.retrieveSimilarMovieList()
   // this.forceUpdate()
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

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return this.shallowCompare(this, nextProps, nextState)
  // }


  getSpecialComponent () {
    return <CastList
      title='Director'
      items={this.props.details.directors || []}
      onPress={this.showCastDetails.bind(this)}
    />
  }
}

const mapStateToProps = (state) => ({
  // {tabNavHelper, search, movies, configuration,
  details: state.tabNavHelper.currentTab === 'Search' ? state.search.details : state.movies.details,
  currentTab: state.tabNavHelper.currentTab,
  config: state.configuration,
  similarmovies: state.moviesNew.similarmovies,
  reviewmovies: state.moviesNew.reviewmovies

})

const mapDispatchToProps =  dispatch => ({
  onDetailsFetched:   (details, category, currentTab) => {
    if (currentTab === 'Search') {
      dispatch(searchItemDetailsFetched(details, category))
    } else {
      dispatch(movieDetailsFetched(details, category))
    }
  },
  onCastSelected:  (cast, currentTab) => {
    dispatch(castSelected(cast, currentTab))
     dispatch(NavigationActions.navigate({routeName: 'CastDetails',
      params: {
        name: cast.name,
        id: cast.id
      }}))
  },
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
  actions:  bindActionCreators(moviesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
