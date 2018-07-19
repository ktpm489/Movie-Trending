import React, {Component} from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider, connect} from 'react-redux'
import {StyleSheet, View, StatusBar , Keyboard } from 'react-native'
import Orientation from 'react-native-orientation'
import promise from 'redux-promise'
import logger from 'redux-logger'
import AppNavigation from './components/AppNavigation'
import SplashScreen from './components/SplashScreen'
import MovieDB from './reducers/root'
import {layoutChanged} from './Actions'
import thunk from 'redux-thunk';
class Screen extends Component {
  render () {
    const {isFetching, onLayoutChange} = this.props
    const color = isFetching ? "#222222" : "#222222"
    return (
      <View style={styles.container} onLayout={onLayoutChange}>
         <StatusBar
          //  backgroundColor={color}
          // barStyle="light-content"
           hidden={true}
         />
        { isFetching ? <SplashScreen /> : <AppNavigation /> }
      </View>
    )
  }
}

const mapStateToProps = state => ({isFetching: state.movies.isFetching})
const mapDispatchToProps = dispatch => ({
  onLayoutChange: (e) => {
    dispatch(layoutChanged())
  }
})

const AppRoot = connect(mapStateToProps, mapDispatchToProps)(Screen)
const middleWare = [promise,thunk]

if (process.env['NODE_ENV'] === 'development') {
  middleWare.push(logger)
}

export default class App extends Component {
  // Component did mount event
  componentDidMount () {
    Keyboard.dismiss()
    Orientation.lockToPortrait()
  }

  render () {
    // TODO - Use redux-promise middleware properly
    // https://medium.com/react-native-training/redux-4-ways-95a130da0cdc
    const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore)

    return (
      <Provider store={createStoreWithMiddleware(MovieDB)}>
        <AppRoot />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222'
  }
})
