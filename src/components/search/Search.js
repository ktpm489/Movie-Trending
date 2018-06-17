import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements'
import * as _ from 'lodash';
import axios from 'axios'

import style, { primaryColor } from '../../styles/light-theme';
import styles from '../../styles/Search'
import Constant from '../../utilities/constants';
import SearchResult from './SearchResult';
import {
  doneSearchingMoviesEtc,
  searchFilterChanged, searchingForMoviesEtc, searchResultSelected,
  selectedMovie, selectedTvShow,
} from '../../Actions';
import { NavigationActions } from 'react-navigation';
import CardItem from '../customComponent/CardItem/CardItem'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as moviesActions from '../../Actions/MovieNewActions'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Encountered an error loading page',    // WebView uri: result.url and url failing to load - "bloomberg suneq" https://github.com/facebook/react-native/issues/7839#issuecomment-224111608
  'Deprecation warning: moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
  'Task orphaned for request ',
  'Remote debugger is in a background tab which may cause apps to perform slowly',
])
const buttons = ['Movie', 'Tv', 'Person']

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: '',
      currentPage: 1,
      searchResults: {
        results: []
      },
      dataSource: [],
      selectedIndex : 0,
    }
  }

  _handleTextInput = (event) => {
    const query = event.nativeEvent.text;
    this.setState({ query });
    if (!query) 
    {
      this.setState({
        query: '', currentPage: 1,
        searchResults: {
          results: []
        },
        dataSource: []
      })
   }

    setTimeout(() => {
      if (query.length) {
        this.props.actions.retrieveMoviesSearchResults(this.state.query, 1)
          .then(() => {
            this.setState({
              dataSource: this.props.searchResults.results,
              searchResults: this.props.searchResults,
              isLoading: false
            });
          });
      }
    }, 500);
  }


  retrieveNextPage = () => {
    if (this.state.currentPage !== this.props.searchResults.total_pages) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });

      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 });
        console.log('paga', page);
      } else {
        page = this.state.currentPage + 1;
        console.log('paga', page);
      }

      axios.get(`${'https://api.themoviedb.org/3'}/search/movie?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=en-US&query=${encodeURIComponent(this.state.query)}&page=${page}`)
        // axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
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
  renderSeparator = () => (
    <View style={{ marginTop: 10}}/>
  )

  renderSearchView = () => {
    let searchView
    const { isSearching, onFilterChanged,
      selectedIndex, config, popular } = this.props;
    const { dataSource } = this.state
    if (this.state.query && !this.state.isLoading) {
      searchView = (

        <FlatList
          keyExtractor={(item, index) => index}
          key={'dummy_key_' + 2}
          removeClippedSubviews={false}
           ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.retrieveNextPage}
          onEndReachedThreshold={1200}
          data={dataSource}
          style={{ marginBottom: 6}}
          renderItem={(item, index) => <CardItem info={item} isCustom={true} />}
        />)
    } else {
      searchView = (
        <SearchResult
          config={config}
          items={[]}
          popular={popular}
        />
      )
    }

    return searchView;
  }

  onFilterChanged = (index) => {
    this.setState({ selectedIndex : index })
  }
  render() {
    const { isSearching, onFilterChanged,
       config, popular, onSearchResultSelected } = this.props;
    const { dataSource, isLoading, selectedIndex } = this.state
    //const filteredResults = this.filterSearchResults(data, selectedIndex);
    //console.log('Render Search', data)
    return (


      <View style={styles.container}>
        <View style={styles.searchbox}>
          <View style={styles.searchboxBorder}>
            <TextInput
              style={[styles.textInput]}
              autoFocus
              returnKeyType={'search'}
              placeholder="Enter Keyword Search" placeholderTextColor="white"
              value={this.state.query}
              onChange={this._handleTextInput}
              underlineColorAndroid="transparent"
            />
          </View>
          <ButtonGroup
            lightTheme={false}
            onPress={this.onFilterChanged}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={[{ height: 30, backgroundColor: '#e1e1e1' }]}
          />
        </View>

        {this.renderSearchView()}
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
  // onFilterChanged: (index) => {
  //   dispatch(searchFilterChanged(index));
  // },
  // onSearchingForMoviesEtc: () => {
  //   dispatch(searchingForMoviesEtc());
  // },
  // onDoneSearchingMoviesEtc: (results) => {
  //   dispatch(doneSearchingMoviesEtc(results));
  // },
  // onSearchResultSelected: (result) => {
  //   const params = {
  //     name: result.name || result.title,
  //     id: result.id
  //   }

  //   dispatch(searchResultSelected(result, result.media_type));
  //   switch (result.media_type) {
  //     case 'movie':
  //       dispatch(NavigationActions.navigate({ routeName: 'MovieDetails', params }));
  //       break;
  //     case 'tv':
  //       dispatch(NavigationActions.navigate({ routeName: 'TvShowDetails', params }));
  //       break;
  //     case 'person':
  //       dispatch(NavigationActions.navigate({ routeName: 'CastDetails', params }));
  //       break;
  //     default:
  //       console.log('Unrecognised media type');
  //       break;
  //   }
  // },
  actions: bindActionCreators(moviesActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
