import React, { Component } from 'react'
import ZoomHeader from './subHeader'
import ZoomPage from './page'
import { Alert ,Platform} from 'react-native'
const ISIOS = Platform.OS === 'ios'
const RNFS = require('react-native-fs')
const progressDivider = 1
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
    this.props.onCloseImageView && this.props.onCloseImageView()
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

  onSaveImage = (link) => {
   // console.log('link', link)
    link && this.downloadFile(false, link)
  }

  downloadFile = (backgroundFlag, url) => {
    let dir = ISIOS ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
    let downloadDest = `${dir}/${(Math.random() * 1000) | 0 + '-' + Date.now()}.jpg`
    const { begin, progressDownload } = this
    console.log('DownLoad Destination', downloadDest)
    let response = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progressDownload, backgroundFlag, progressDivider })
    response.promise.then(res => {
      this.onShowDownloadFunction()
      console.log('DownloadSuccess', res)
    }).catch(err => {
      console.log('Show Error', err)
    })
  }

  onShowDownloadFunction = () => {
    this.notification && this.notification.show({
      title: 'Download Files !!!',
      message: 'Download Files Successfully !!!',
    })
  }
 setNotificatioRefs = (ref) => {
   this.notification = ref
 }

  onClickDownload = (index) => {
    const { data } = this.props
    console.log('index Click', index, data[index])
    this.onSaveImage(data[index].url)
    // this.onShowDownloadFunction()
  }
  renderHeader = () => {
    const { data } = this.props
    const { showHeader, index } = this.state
    const { onCloseHeader, onCloseImageView, onClickDownload, setNotificatioRefs } = this
    return (
      <ZoomHeader
        data={data}
        index={index}
        showHeader={showHeader}
        animationEnd={onCloseHeader}
        onClickBack={onCloseImageView}
        onClickDownload={onClickDownload}
        setNotificatioRefs={setNotificatioRefs}
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
