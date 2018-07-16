import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, FlatList ,Keyboard, TouchableOpacity } from 'react-native';
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
import * as tvActions from '../../Actions/TvNewActions'
import * as personActions from '../../Actions/PersonNewActions'
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings } from '../../utilities/globalFunction'
import { LANGUAGE_KEY } from '../../utilities/constants'
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
      // index data
      selectedIndex : 0,
      // tv data
      isLoadingTv : true,
      currentTvPage: 1,
      searchTvResults : {
        results: []
      },
      dataTvSource: [],
      // person data
      isLoadingPerson: true,
      currentPersonPage: 1,
      searchPersonResults: {
        results: []
      },
      dataPersonSource: [] 
    }
  }
  componentDidMount() {
    Keyboard.dismiss()
  }
  
  _handleTextInput = async (event) => {
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

    setTimeout(async () => {
      if (query.length) {
        // TODO search for movie, tv,person
      await  this.props.actions.retrieveMoviesSearchResults(this.state.query, 1)
          .then(() => {
            this.setState({
              dataSource: this.props.searchResults.results,
              searchResults: this.props.searchResults,
              currentPage: 1,
              isLoading: false
            });
          });
        // search tv
      await  this.props.tvActions.retrieveTVSearchResults(this.state.query, 1)
          .then(() => {
            this.setState({
              dataTvSource: this.props.searchTvResults.results,
              searchTvResults: this.props.searchTvResults,
              currentTvPage: 1,
              isLoadingTv: false
            });
          });
        // search person  
       await this.props.personActions.retrievePersonSearchResults(this.state.query, 1)
          .then(() => {
            this.setState({
              dataPersonSource: this.props.searchPersonResults.results,
              searchPersonResults: this.props.searchPersonResults,
              currentPersonPage: 1,
              isLoadingPerson: false
            });
          });
      }
    }, 500);
  }

  resetData = () =>{
    this.setState({
        isLoading: true,
        query: '',
        currentPage: 1,
        searchResults: {
          results: []
        },
        dataSource: [],
        // index data
        selectedIndex: 0,
        // tv data
        isLoadingTv: true,
        currentTvPage: 1,
        searchTvResults: {
          results: []
        },
        dataTvSource: [],
        // person data
        isLoadingPerson: true,
        currentPersonPage: 1,
        searchPersonResults: {
          results: []
        },
        dataPersonSource: []
    })
  }

  searchPopular =  async (query) => {
   await this.props.actions.retrieveMoviesSearchResults(query, 1)
      .then(() => {
        this.setState({
          dataSource: this.props.searchResults.results,
          searchResults: this.props.searchResults,
          currentPage: 1,
          query : query,
          isLoading: false,
          selectedIndex: 0,
        });
      });
      // todo search for tv, person
    // search tv
  await  this.props.tvActions.retrieveTVSearchResults(query, 1)
      .then(() => {
        this.setState({
          dataTvSource: this.props.searchTvResults.results,
          searchTvResults: this.props.searchTvResults,
          currentTvPage: 1,
          isLoadingTv: false
        });
      });
    // search person  
   await this.props.personActions.retrievePersonSearchResults(query, 1)
      .then(() => {
        this.setState({
          dataPersonSource: this.props.searchPersonResults.results,
          searchPersonResults: this.props.searchPersonResults,
          currentPersonPage: 1,
          isLoadingPerson: false
        });
      });
  }

  retrieveNextPage = async () => {
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
    //SAVE STORAGE
      let settings = await getSettings(LANGUAGE_KEY);

      await axios.get(`${'https://api.themoviedb.org/3'}/search/movie?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=${settings}&query=${encodeURIComponent(this.state.query)}&page=${page}`)
        // axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
        // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1
        //https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false 
        .then(res => {
          const data = this.state.dataSource;
          const newData = res.data.results;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataSource: data
          });
        }).catch(err => {
          console.log('next page', err); // eslint-disable-line
        });
    }
  }


  // TODO retrieveTvNextPage

  retrieveTvNextPage = async () => {
    if (this.state.currentTvPage !== this.props.searchTvResults.total_pages) {
      this.setState({
        currentTvPage: this.state.currentTvPage + 1
      });

      let page;
      if (this.state.currentTvPage === 1) {
        page = 2;
        this.setState({ currentTvPage: 2 });
        console.log('paga', page);
      } else {
        page = this.state.currentTvPage + 1;
        console.log('paga', page);
      }
      let settings = await getSettings(LANGUAGE_KEY);
      await axios.get(`${'https://api.themoviedb.org/3'}/search/tv?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=${settings}&query=${encodeURIComponent(this.state.query)}&page=${page}`)
        // axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
        // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1
        //https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false 
        .then(res => {
          const data = this.state.dataTvSource;
          const newData = res.data.results;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataTvSource: data
          });
        }).catch(err => {
          console.log('next page', err); // eslint-disable-line
        });
    }
  }
  // TODO retrievePersonNextPage

  retrievePersonNextPage = async () => {
    if (this.state.currentPersonPage !== this.props.searchPersonResults.total_pages) {
      this.setState({
        currentPersonPage: this.state.currentPersonPage + 1
      });

      let page;
      if (this.state.currentPersonPage === 1) {
        page = 2;
        this.setState({ currentPersonPage: 2 });
        console.log('paga', page);
      } else {
        page = this.state.currentPersonPage + 1;
        console.log('paga', page);
      }
      let settings = await getSettings(LANGUAGE_KEY);
      await axios.get(`${'https://api.themoviedb.org/3'}/search/person?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=${settings}&query=${encodeURIComponent(this.state.query)}&page=${page}`)
        // axios.get(`${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${this.state.query}&page=${page}`)
        // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&page=1
        //https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false 
        .then(res => {
          const data = this.state.dataPersonSource;
          const newData = res.data.results;

          newData.map((item, index) => data.push(item));

          this.setState({
            dataPersonSource: data
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
    const { isSearching, onFilterChanged, config, popular, onSearchResultSelected } = this.props;
    const { dataSource, selectedIndex } = this.state
    if (this.state.query && !this.state.isLoading) {
      searchView = (

        <FlatList
          keyExtractor={(item, index) => index}
          key={'dummy_key_' + 2}
           removeClippedSubviews={false}
           ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.retrieveNextPage}
          onEndReachedThreshold={120}
          data={dataSource}
          style={{ marginBottom: 6}}
          renderItem={(item, index) => <CardItem info={item} isCustom={true} onShowDetails={onSearchResultSelected} selectedIndex={selectedIndex}/>}
        />)
    } else {
      searchView = (
        <SearchResult
          config={config}
          items={[]}
          popular={popular}
          onSelectPopular={this.searchPopular}
        //  onSelect={onSearchResultSelected}
        />
      )
    }

    return searchView;
  }

  onFilterChanged = (index) => {
    this.setState({ selectedIndex : index })
    this.calculateRenderPage(index)
  }

  // TODO renderSearchView for tv, person
  renderTVSearchView = () => {
    let searchView
    const { isSearching, onFilterChanged,
       config, popular, onSearchResultSelected } = this.props;
    const { dataTvSource, selectedIndex } = this.state
    if (this.state.query && !this.state.isLoadingTv) {
      searchView = (

        <FlatList
          keyExtractor={(item, index) => index}
          key={'dummy_key_' + 2}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.retrieveTvNextPage}
          onEndReachedThreshold={120}
          data={dataTvSource}
          style={{ marginBottom: 6 }}
          renderItem={(item, index) => <CardItem info={item} isCustom={true} onShowDetails={onSearchResultSelected} selectedIndex={selectedIndex} />}
        />)
    } else {
      searchView = (
        <SearchResult
          config={config}
          items={[]}
          popular={popular}
          onSelectPopular={this.searchPopular}
        //  onSelect={onSearchResultSelected}
        />
      )
    }

    return searchView;
  }

  renderPersonSearchView = () => {
    let searchView
    const { isSearching, onFilterChanged,
       config, popular, onSearchResultSelected } = this.props;
    const { dataPersonSource, selectedIndex } = this.state
    if (this.state.query && !this.state.isLoadingPerson) {
      searchView = (

        <FlatList
          keyExtractor={(item, index) => index}
          key={'dummy_key_' + 2}
          removeClippedSubviews={false}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.retrievePersonNextPage}
          onEndReachedThreshold={120}
          data={dataPersonSource}
          style={{ marginBottom: 6 }}
          renderItem={(item, index) => <CardItem info={item} isCustom={true} onShowDetails={onSearchResultSelected} selectedIndex={selectedIndex} />}
        />)
    } else {
      searchView = (
        <SearchResult
          config={config}
          items={[]}
          popular={popular}
          onSelectPopular={this.searchPopular}
        //  onSelect={onSearchResultSelected}
        />
      )
    }

    return searchView;
  }

  calculateRenderPage = (index) => {
    switch (index){
      case 0 :
      return this.renderSearchView()
      case 1: 
      return this.renderTVSearchView()
      case 2:
      return this.renderPersonSearchView()
      default:
      return this.renderSearchView()
    }
  }

  onPressDismiss = ()=> {
    Keyboard.dismiss()
  }

  render() {
    const { isSearching, onFilterChanged,
       config, popular, onSearchResultSelected } = this.props;
    const { dataSource, isLoading, selectedIndex } = this.state
    //const filteredResults = this.filterSearchResults(data, selectedIndex);
    //console.log('Render Search', data)
    return (


      <TouchableOpacity style={styles.container} onPress={this.onPressDismiss}>
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

        {this.calculateRenderPage(selectedIndex)}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  config: state.configuration,
  popular: state.movies.categories.popular,
  ...state.search,
  searchResults: state.moviesNew.searchResults,
  searchTvResults: state.tv.searchResults,
  searchPersonResults: state.person.searchResults
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
  onSearchResultSelected: (result , index = 0 ) => {
    const params = {
      name: result.name || result.title,
      id: result.id
    }
   // console.log('param',params)
    console.log(buttons[index].toLowerCase())
    dispatch(searchResultSelected(result, buttons[index].toLowerCase()));
   // dispatch(NavigationActions.navigate({ routeName: 'MovieDetails', params }));
  //  dispatch(searchResultSelected(result, result.media_type));
    switch (buttons[index].toLowerCase()) {
     case 'movie':
    dispatch(NavigationActions.navigate({ routeName: 'MovieDetails', params }));
        break;
      case 'tv':
        dispatch(NavigationActions.navigate({ routeName: 'TvShowDetails', params }));
        break;
      case 'person':
        dispatch(NavigationActions.navigate({ routeName: 'CastDetails', params }));
        break;
      default:
        console.log('Unrecognised media type');
        break;
    }
  },
  actions: bindActionCreators(moviesActions, dispatch),
  tvActions :bindActionCreators(tvActions, dispatch),
  personActions : bindActionCreators(personActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
