import React, { Component } from 'react'
import ZoomHeader from './subHeader'
import ZoomPage from './page'
import { Alert} from 'react-native'
export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      modalVisible: false,
      showHeader: true
    }
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.modalVisible && this.setState({ modalVisible: nextProps.modalVisible })
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
  // 
  begin = (res) => {
    console.log('Response', 'Begin download')
  }
  progressDownload = (data) => {
    let percentage = ((100 * data.bytesWritten) / data.contentLengh) | 0
    let text = `Progress ${percentage}%`
    console.log('Download Data', text)
  }
  // 

  onShowConfimDialog = () => {
    Alert.alert(
      'Downloading...',
      'Do you want to download it?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.onSaveImage() },
      ],
      { cancelable: false }
    )
  }

  onSaveImage = (link = 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460') => {
   // console.log('link', link)
    this.downloadFile(false, link)
  }

  downloadFile = (backgroundFlag, url) => {
    let dir = ISIOS ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
    let downloadDest = `${dir}/${(Math.random() * 1000) | 0 + '-' + Date.now()}.jpg`
    const { begin, progressDownload } = this
    console.log('DownLoad Destination', downloadDest)
    let response = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progressDownload, backgroundFlag, progressDivider })
    response.promise.then(res => {
      console.log('DownloadSuccess', res)
    }).catch(err => {
      console.log('Show Error', err)
    })
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
