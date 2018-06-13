import React, { Component } from "react";
import { View, Modal, Text, Dimensions, Alert, Platform } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import * as Animatable from 'react-native-animatable';
import Dialog from 'react-native-dialog'
//   save data blob
const RNFS = require('react-native-fs')
const ISIOS = Platform.OS === 'ios'
const progressDivider = 1
/** MainBundlePath: RNFSManager.RNFSMainBundlePath,
  CachesDirectoryPath: RNFSManager.RNFSCachesDirectoryPath,
  ExternalCachesDirectoryPath: RNFSManager.RNFSExternalCachesDirectoryPath,
  DocumentDirectoryPath: RNFSManager.RNFSDocumentDirectoryPath,
  ExternalDirectoryPath: RNFSManager.RNFSExternalDirectoryPath,
  ExternalStorageDirectoryPath: RNFSManager.RNFSExternalStorageDirectoryPath,
  TemporaryDirectoryPath: RNFSManager.RNFSTemporaryDirectoryPath,
  LibraryDirectoryPath: RNFSManager.RNFSLibraryDirectoryPath,
  PicturesDirectoryPath: RNFSManager.RNFSPicturesDirectoryPath **/
const images = [
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460",
        props: {
            renderHeader: () => <Text style={{ width: 20, height: 20, color: 'white', backgroundColor: 'white', marginTop: 10 }}>AAAA</Text>
        }
    },
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
    },
    {
        url: "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
    }
];
const width = Dimensions.get('window').width
export default class Main extends Component {
    state = {
        index: 0,
        modalVisible: true,
        showHeader: true,
        dialogVisible: false
    };

    componentWillReceiveProps = (nextProps) => {
        nextProps.modalVisible && this.setState({ modalVisible: nextProps.modalVisible })
    }
    animationEnd = () => {
        this.setState({
            showHeader: false
        })
    }



    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };

    renderHeader = () => {
        //  <Text style={{ width: width, marginTop: 20, color: 'white', alignSelf: 'center', textAlign: 'center', backgroundColor: 'black' }}>{index}</Text>
        const { showHeader, index } = this.state
        console.log("index", index)
        return (
            <View style={{ width: width, paddingHorizontal: 30, marginTop: 30, alignSelf: 'center', backgroundColor: 'red', opacity: 1 }}>
                {(showHeader) ?
                    // <Animatable.View onAnimationEnd={this.animationEnd} animation='fadeOut' delay= {3000} duration={10}  style={{ width: width, alignSelf: 'center', backgroundColor: 'red' }}>
                    <Animatable.Text onAnimationEnd={this.animationEnd} animation='fadeOut' delay={3000} duration={10} style={{ width: width, color: 'white', alignSelf: 'center', textAlign: 'center', backgroundColor: 'black', opacity: 1 }}>{index}</Animatable.Text>
                    // </Animatable.View>
                    : <Text style={{ width: width, color: 'white', alignSelf: 'center', textAlign: 'center', backgroundColor: 'black', opacity: 0 }}>{index}</Text>
                }
            </View>
        )
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
        // alert('OK')
        // alert('OK')
        // Alert.alert('OK',   [
        //  { text : 'Cancel', onPress : () => console.log('Cancel Press') , style :'cancel' },
        //    { text: 'OK', onPress : () => console.log('OK Pressed')}
        //   ])
        // Alert.alert(
        //   'Do you want to download it?',
        //   [
        //   { text : 'Cancel', onPress : () => console.log('Cancel Press') , style :'cancel' },
        //   { text: 'OK', onPress : () => console.log('OK Pressed')},
        //   ]
        // )
        // return (
        //   <View>
        //     <Dialog>
        //       <Dialog.Title>Account delete</Dialog.Title>
        //       <Dialog.Description>
        //         Do you want to delete this account? You cannot undo this action.
        //       </Dialog.Description>
        //       <Dialog.Button label="Cancel" />
        //       <Dialog.Button label="Delete" />
        //     </Dialog>
        //   </View>
        // )
        // Works on both iOS and Android
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

    onSaveImage = () => {
        let link = "https://avatars2.githubusercontent.com/u/7970947?v=3&s=460"
        console.log('link', link)
        this.downloadFile(false, link)
    }

    downloadFile = (backgroundFlag, url) => {
        let dir = ISIOS ? RNFS.DocumentDirectoryPath : RNFS.PicturesDirectoryPath
        let downloadDest = `${dir}/${(Math.random() * 1000) | 0 + '-' + Date.now()}.jpg`
        const { begin, progressDownload } = this
        console.log('DownLoad Destination', downloadDest)
        let response = RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progressDownload, backgroundFlag, progressDivider })
        response.promise.then(res => {
            //   let reponseJSON = JSON.parse(res.body)
            // console.log('Download Image success', reponseJSON)
            console.log('DownloadSuccess', res)
        }).catch(err => {
            console.log('Show Error', err)
        })
    }

    render() {
        return (
            <View
                style={{
                    padding: 10
                }}
            >
                <Modal
                    visible={this.state.modalVisible}
                    transparent={true}
                    onRequestClose={() => this.setState({ modalVisible: false })}
                >
                    <ImageViewer imageUrls={images} index={this.state.index}
                        //    renderIndicator = {() => {}}
                        onChange={(index) => this.setState({ index: index, showHeader: true })}
                        onSwipeDown={() => { this.setState({ modalVisible: false }) }}
                        onClick={() => { this.onShowConfimDialog() }}
                        onDoubleClick={() => { console.log('On Double Click') }}
                        onSaveToCamera={(index) => { console.log('Save to camera') }}

                        saveToLocalByLongPress={true}
                        onSave={(url = 'ABC') => { console.log(url) }}
                    />
                </Modal>

            </View>
        );
    }
}