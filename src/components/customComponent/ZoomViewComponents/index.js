import React, { Component } from 'react'
import ZoomHeader from './subHeader'
import ZoomPage from './page'
import { Alert, Platform, CameraRoll, PermissionsAndroid } from 'react-native'
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
    this.notification  = null
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

  onSaveImage = async  (link) => {
    console.log('link', link)
    link && await this.downloadFile(false, link)
  }

  downloadFile =  async (backgroundFlag, url) => {
    let dir = ISIOS ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
    let downloadDest = `${dir}/${(Math.random() * 1000) | 0 + '-' + Date.now()}.jpg`
    const { begin, progressDownload } = this
    const THIS = this
    console.log('DownLoad Destination', downloadDest)
    let response = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progressDownload, backgroundFlag, progressDivider })
    await response.promise.then( async (res) => {
      // save to lib
     // this.onShowDownloadFunction()
      // var promise = CameraRoll.saveImageWithTag(downloadDest);
      // promise.then(function (result) {
      //   console.log('save succeeded ' + result);
      //   this.onShowDownloadFunction()
      // }).catch(function (error) {
      //   this.onShowDownloadFunction(true)
      //   console.log('save failed ' + error);
      // });
    // console.log('DownloadSuccess', res)
      await this.saveImgToCameraRoll(downloadDest, THIS)
    }).catch(err => {
     // THIS.onShowDownloadFunction(true)
      console.log('Show Error', err)
    })
  }
  saveImgToCameraRoll=  async (url, THIS) => {
    if (ISIOS) {
      this.saveDataToPhotoGallery(url, THIS)
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            'title': 'Permisson denied',
            'message': '"Moive Trenind 24h" Would like to write data to phone'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.saveDataToPhotoGallery(url, THIS)
          console.log('You can write data')
        } else {
          console.log('Write Data permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    }
  }

  saveDataToPhotoGallery = (downloadDest, THIS) => {
    var promise = CameraRoll.saveToCameraRoll('file://' +downloadDest);
      promise.then((result) => {
        console.log('save succeeded ' + result);
        console.log('SAVE DATA THIS', THIS)
        THIS.onShowDownloadFunction(THIS, false)
        THIS.deleteLocalFile('file://' + downloadDest)
      }).catch((error) =>{
      THIS.onShowDownloadFunction(THIS,true)
        console.log('save failed ' + error);
      });
  }

  deleteLocalFile = (uri) => {
    RNFS.unlink(uri)
      .then(() => {
        console.log('FILE DELETED')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }


  onShowDownloadFunction = (THIS, isError = false) => {
   // console.log('THIS', THIS)
     THIS.notification && THIS.notification.show({
      title: 'Download Files !!!',
      message: isError ?'Download File Error. Please try again !' : 'Download Files Successfully !!!',
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
