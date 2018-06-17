import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements'
import * as _ from 'lodash';
import axios from 'axios'

import style, { primaryColor } from '../../styles/light-theme';
import Constant from '../../utilities/constants';
import SearchResult from './SearchResult';
import { 
  doneSearchingMoviesEtc,
  searchFilterChanged, searchingForMoviesEtc, searchResultSelected,
  selectedMovie, selectedTvShow,
} from '../../Actions';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
 import * as moviesActions from '../../Actions/MovieNewActions' 
const buttons = ['Movie']

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      value: '',
      currentPage : 1,
      searchResults: {
        results: []
      },
      dataSource : []
    }
  }


  onTextChange = (e) => {
    // Set value
    this.setState({ value: e });
    _.debounce(this.onSearch,500)()
  }

  onSearch = () => {

    // Search only if there is any value
    const {value} = this.state
    if (value) {
      this.props.actions.retrieveMoviesSearchResults(value, 1).then(()=> {
        this.setState({
          dataSource: this.props.searchResults.results,
          isLoading : false
        })

      })
    }
  }

  onClearText = () => {
    this.setState({
      value: '',
      currentPage: 1,
      searchResults: {
        results: []
      },
      dataSource : []
    })
  }

  retrieveNextPage = () => {
    const {value } = this.state
    if (this.state.currentPage !== this.props.searchResults.total_pages && value){
      this.setState({
        currentPage : this.state.currentPage + 1
      })

      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 });
      } else {
        page = this.state.currentPage + 1;
      }

      axios.get(`${Constant.TMDB_URL}/search/movie/?api_key=${Constant.TMDB_API_KEY}&query=${this.state.value}&page=${page}`)
        .then(res => {
          const data = this.state.searchResults.results;
          const newData = res.data.results;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataSource: this.state.searchResults.results
          });
        }).catch(err => {
          console.log('next page', err); // eslint-disable-line
        });
    }
  }

  /**
   * Filters search results based on media_type
   */
  filterSearchResults = (results, index) => {
    return results.filter((result) => {
      return result.media_type.toLowerCase() === buttons[index].toLowerCase()
    })
  }

  render() {
    const { isSearching, onFilterChanged,
      selectedIndex, config, popular} = this.props;
    const { dataSource } = this.state 
    //const filteredResults = this.filterSearchResults(data, selectedIndex);
    //console.log('Render Search', data)
    return (
      <View>
        <SearchBar
          style={{marginTop: 20}}
          // lightTheme
          round
          onChangeText={this.onTextChange}
          onClearText={this.onClearText}
          placeholder='Search'
          value={this.state.value}
        />

        <ButtonGroup
            lightTheme={false}
            onPress={onFilterChanged.bind(this)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30, backgroundColor: '#e1e1e1', marginTop: 10}}
          />

        <View>
        {isSearching ? 
          <ActivityIndicator size="large" color={primaryColor}/> :
          <SearchResult 
            config={config} 
              items={dataSource} 
            popular={popular}
            retrieveNextPage={this.retrieveNextPage}
            onSelectPopular={this.onTextChange}
            onSelect={onSearchResultSelected}/>}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  config: state.configuration,
  popular: state.movies.categories.popular,
  ...state.search,
  searchResults: state.moviesNew.searchResults
});

const mapDispatchToProps = dispatch => ({
  onFilterChanged: (index) => {
    dispatch(searchFilterChanged(index));
  },
  onSearchingForMoviesEtc: () => {
    dispatch(searchingForMoviesEtc());
  },
  onDoneSearchingMoviesEtc: (results) => {
    dispatch(doneSearchingMoviesEtc(results));
  },
  onSearchResultSelected: (result) => {
    const params = {
      name: result.name || result.title,
      id: result.id
    }

    dispatch(searchResultSelected(result, result.media_type));
    switch(result.media_type) {
      case 'movie':
        dispatch(NavigationActions.navigate({routeName: 'MovieDetails', params}));
        break;
      case 'tv':
        dispatch(NavigationActions.navigate({routeName: 'TvShowDetails', params}));
        break;
      case 'person':
        dispatch(NavigationActions.navigate({routeName: 'CastDetails', params}));
        break;
      default:
        console.log('Unrecognised media type');
        break;
    }
  }, 
  actions : bindActionCreators(moviesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
