import React from 'react'
import AsyncImage from '../components/customComponent/AsyncImage'
const imageLoading = require('../Assets/Image/Loading.gif')

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