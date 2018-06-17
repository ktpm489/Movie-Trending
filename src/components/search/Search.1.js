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
  
const buttons = ['Movie', 'Tv', 'Person']

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage : 1,
      data: props.results || [],
      totalPage: 2
    }
  }
  componentDidMount() {
    // this.setState({
    //   value: '',
    //   currentPage: 1,
    //   data: [],
    //   totalPage: 2
    // })
  }
  onTextChange = (e) => {
    // Set value
    this.setState({ value: e });
    _.debounce(this.onSearch,500)()
  }

  onSearch = () => {
    let { api_base_url, lan_region, api_key } = Constant;
    const searchUrl = '/search/multi';

    // Search only if there is any value
    const {value} = this.state
    if (value) {
      const url = `${api_base_url}${searchUrl}?${api_key}${lan_region}&query=${encodeURIComponent(value)}`;
      this.props.onSearchingForMoviesEtc();
  
      axios.get(url)
        .then(({data}) => {
          console.log('data',data)
          if (data.total_pages !== this.state.totalPage) {
            this.setState({ totalPage: data.total_pages })
          }
          this.setState({ data: data.results})

          this.props.onDoneSearchingMoviesEtc(data.results)
        }, (err) => {
          console.error(err.response);
        });
    }
  }

  onClearText = () => {
    this.setState({
      value: '',
      currentPage: 1,
      data: [],
      totalPage: 2
    })
  }

  retrieveNextPage = async (flagIsFirstLoad = false) => {
    const { value , data } = this.state
    console.log( 'retrieve next page',this.state.currentPage , this.state.totalPage, value)
    if ((this.state.currentPage < this.state.totalPage) && value)  {
    //   let page = this.state.currentPage + 1
    // //  this.props.onSearchingForMoviesEtc();
   

      this.setState({
        currentPage: this.state.currentPage + 1
      });

      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 });
      } else {
        page = this.state.currentPage + 1;
      }
      axios.get(`${'https://api.themoviedb.org/3'}/search/multi?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=en-US&query=${encodeURIComponent(value)}&page=${page}`)
        .then((res) => {
          
          const newData = res.data.results;
          if (res.data.total_pages !== this.state.totalPage) {
            this.setState({ totalPage: res.data.total_pages })
          }
          let currencyData = data
          newData.map((item, index) => currencyData.push(item))
          this.setState({ data: currencyData })
        //  this.props.onDoneSearchingMoviesEtc(data)
        })
        .catch(error => console.error(error.response))
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
    const {results, isSearching, onFilterChanged, onSearchResultSelected,
      selectedIndex, config, popular} = this.props;
      const { data } = this.state 
    const filteredResults = this.filterSearchResults(data, selectedIndex);
    console.log('Render Search', data)
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
            items={filteredResults} 
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
