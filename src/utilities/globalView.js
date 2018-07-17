import React from 'react'
import { Platform } from 'react-native'
import AsyncImage from '../components/customComponent/AsyncImage'
const imageLoading = Platform.OS === 'ios' ? require('../Assets/Image/Loading.gif') : require('../Assets/Image/Loading1.gif')

export default function CustomImage(props) {
    const {
        styles,
        linkSource
    } = props
    return (
        <AsyncImage
            {...props}
            style = {styles}
            placeholderSource={imageLoading}
             placeholderColor = '#b3e5fc'
             source={linkSource}
        />
    )
}