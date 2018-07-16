import React from 'react'
import { View, Modal, StatusBar } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'
import styles from './styles'

const zoomPage = (props) => {
  const { data, onShowHeader, index, modalVisible, onRequestClose, renderHeader, onChangeImage, onSwipeDown } = props
  const others = { alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: '#303030', flex: 1, width : '100%' }
  return (
    <View style={styles.mainContainer}>
      {
        modalVisible && <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      }

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={onRequestClose}
      >
        <ImageViewer
          imageUrls={data}
          index={index}
          renderHeader={renderHeader}
          renderIndicator={() => { }}
          onChange={onChangeImage}
          onSwipeDown={onSwipeDown}
          onClick={onShowHeader}
          {...others}
        />
      </Modal>
    </View>
  )
}
export default (zoomPage)
