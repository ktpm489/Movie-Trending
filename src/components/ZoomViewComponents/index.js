import React, { Component } from 'react'
import ZoomHeader from './subHeader'
import ZoomPage from './page'
import { EventRegister } from 'react-native-event-listeners'
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      modalVisible: false,
      showHeader: true
    }
  }

  componentDidMount () {
    this.loadServiceDetailImageData = EventRegister.addEventListener('loadServiceDetailImageData', (index) => {
      this.setState({ modalVisible: true, index })
    })
  }

  componentWillUnmount () {
    EventRegister.removeEventListener(this.loadServiceDetailImageData)
  }

  onCloseHeader = () => {
    this.setState({ showHeader: false })
  }

  onShowHeader = () => {
    this.setState({ showHeader: true })
  }

  onCloseImageView = () => {
    this.setState({ modalVisible: false })
  }

  onChangeImage = (index) => {
    const { onSelectedIndex } = this.props
    onSelectedIndex && onSelectedIndex(index)
    this.setState({ index, showHeader: true })
  }

  renderHeader = () => {
    const { data } = this.props
    const { showHeader, index } = this.state
    const { onCloseHeader, onCloseImageView } = this
    return (
      <ZoomHeader
        data={data}
        index={index}
        showHeader={showHeader}
        animationEnd={onCloseHeader}
        onClickBack={onCloseImageView}
      />
    )
  }

  render () {
    const { data } = this.props
    const { modalVisible, index } = this.state
    const { renderHeader, onChangeImage, onCloseImageView, onShowHeader } = this
    return (
      <ZoomPage
        data={data}
        index={index}
        modalVisible={modalVisible}
        onRequestClose={onCloseImageView}
        renderHeader={renderHeader}
        onChangeImage={onChangeImage}
        onSwipeDown={onCloseImageView}
        onShowHeader={onShowHeader}
      />
    )
  }
}
