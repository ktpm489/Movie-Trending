import React, { Component } from 'react'
import { Dimensions, StyleSheet, View, FlatList, Button, TouchableOpacity, Text } from 'react-native'
import { FlatImageList } from '../common/ImageList'
import { connect } from 'react-redux'
import { selectedTvShow } from '../../Actions'
import { NavigationActions } from 'react-navigation'
import style from '../../styles/light-theme'
import styles from '../../styles/MovieList'
import ProgressBar from '../customComponent/ProgressBar'
import axios from 'axios'
import Constant from '../../utilities/constants'
import CardItem from '../customComponent/CardItem/CardItem'
import Icon from 'react-native-vector-icons/Ionicons'
// return device width and height
const {height, width} = Dimensions.get('window')
const numColumns = parseInt(width / (92 + (5 * 2)))
const iconShuffle = <Icon name="ios-shuffle" size={40} color="#3CCB3E" style={{ marginRight: 10 }} />
class AllTvShows extends Component {


  static navigationOptions = ({ navigation }) => {

    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => params.handleSave && params.handleSave()}>
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
      data: [],
      totalPage: 2,
      isGridView: false,
    }
    this.type = this.getTypeParam(this.props.navigation.state.params.category.toCategory())
  }

  componentWillMount = () => {
    // firstLoad
    // await  this.retrieveNextPage(true)
    const { categories } = this.props
    const { category } = this.props.navigation.state.params
    this.setState({ data: categories[category.toCategory()], isLoading: false })

  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.saveDetails });

  }

  saveDetails = () => {
    console.log('Save Details');
    this.setState({ isGridView: !this.state.isGridView })
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

  retrieveNextPage = async (flagIsFirstLoad = false) => {
    if (this.state.currentPage < this.state.totalPage) {
      this.setState({ currentPage: page })
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
      console.log('Retrieve render TV Movie', page)
      console.log('Data', this.state.data)
      // SAVE STORE
      axios.get(`${'https://api.themoviedb.org/3'}/tv/${this.type}?api_key=${'87dfa1c669eea853da609d4968d294be'}&language=en-US&page=${page}`)
        .then(async (res) => {
          const data = this.state.data
          const newData = res.data.results;
          console.log('res.data.total_pages', res.data.total_pages)
          if (res.data.total_pages !== this.state.totalPage) {
            this.setState({ totalPage: res.data.total_pages })
          }
          await newData.map((item, index) => data.push(item))
          console.log('current TV Movie', res.data.page)
          this.setState({ data: data })
        })
        .catch(error => console.error(error.response))
    }
    this.setState({ isLoading: false })
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

    const { data, isLoading } = this.state
  //  / const { dataSource, isLoading } = this.state
    const { onShowDetails, categories, config } = this.props
    //console.log('data',data)
    return (
      isLoading ?
        <View style={styles.progresssBar}><ProgressBar /></View>
        :
        !this.state.isGridView ?
          <FlatList
            key={'dummy_key_' + numColumns}
            style={{
              backgroundColor: style.screenBackgroundColor,
              marginTop: 2,
            }}
            numColumns={1}
            data={data}
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
            images={data}
            onPress={onShowDetails.bind(this)}
          />
    )
  }
}

const mapStateToProps = state => ({
  ...state.tvShows,
  config: state.configuration
})

const mapDispatchToProps = dispatch => ({
  onShowDetails: (tvShow) => {
    dispatch(selectedTvShow(tvShow))
    dispatch(NavigationActions.navigate({routeName: 'TvShowDetails',
      params: {
        name: tvShow.name,
        id: tvShow.id
      }}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTvShows)
