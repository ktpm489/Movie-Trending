

import React, { Component } from 'react'
import {
    Icon
} from 'react-native-elements'
import {
    Animated,
    View, TouchableWithoutFeedback
} from 'react-native'
import ZoomView from './ZoomViewComponents'
import { height } from './ZoomViewComponents/globalStyles';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);

class AsyncImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            imageOpacity: props.placeholderSource ?
                new Animated.Value(1.0) :
                new Animated.Value(0.0),
            placeholderOpacity: new Animated.Value(1.0),
            placeholderScale: new Animated.Value(1.0),
            modalVisible : false
        }
    }
    _onError = () => {
        console.log('Error Image')
    }
   


    onCloseImageView  = () => {
        this.setState({ modalVisible: false })
    }

    pressItem = () => {
        const { isNeedShowFull, imgDetailsData } = this.props
        console.log("Press Item", this.state.loaded , imgDetailsData , imgDetailsData.length > 0)
        if (this.state.loaded && imgDetailsData && imgDetailsData.length > 0 && isNeedShowFull) {
            console.log('PressItem')
            this.setState({ modalVisible : true })
        }
    }
    render() {
        const {
            placeholderColor,
            placeholderSource,
            style,
            source,
            isYoutubeIcon,
            imgDetailsData,
            isNeedShowFull,
        } = this.props
        const {
            imageOpacity,
            loaded,
            placeholderOpacity,
            placeholderScale,
            modalVisible
        } = this.state
        console.log('isNeedShowFull', isNeedShowFull)
        return ( 
            <View style={[style, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }]} >
             <View style={[style, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }]} >
                {isNeedShowFull ? 
                    <TouchableWithoutFeedback onPress={this.pressItem}>
                            <Image
                                source={source}
                                indicator={Progress.Pie}
                                indicatorProps={{
                                    size: 80,
                                    borderWidth: 0,
                                    color: 'rgba(150, 150, 150, 1)',
                                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                }}
                                style={
                                    [
                                        style,
                                        {
                                            opacity: imageOpacity,
                                            position: 'absolute',
                                            resizeMode: 'cover',
                                            overflow: 'hidden',

                                        }
                                    ]
                                }
                                onError={
                                    this._onError
                                }
                                 />
                    </TouchableWithoutFeedback>
                
                : 
                    
                        <Image
                            source={source}
                            indicator={Progress.Pie}
                            indicatorProps={{
                                size: 80,
                                borderWidth: 0,
                                color: 'rgba(150, 150, 150, 1)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                            style={
                                [
                                    style,
                                    {
                                        opacity: imageOpacity,
                                        position: 'absolute',
                                        resizeMode: 'cover',
                                        overflow: 'hidden',

                                    }
                                ]
                            }
                            onError={
                            this._onError
                        } />
                   
                
                } 
            {
            isYoutubeIcon && < Icon
                                name='youtube-play'
                                type='font-awesome'
                                size={50}
                                color='#ff0000'
                                style = {
                                [ {
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    paddingVertical: height(20),
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    zIndex: 999,
                                    elevation: 2
                                }]
                             }/>
            }
            {/* {
                (placeholderSource && !loaded) &&
                < Animated.Image
                index={Math.random(100).toString()}
                source = {  placeholderSource  }
                style = {
                    [style,
                        {
                            opacity: placeholderOpacity,
                            position: 'absolute',
                            resizeMode: 'cover',
                            overflow: 'hidden'
                        }
                    ]
                }
                />
            }

            {
                (!placeholderSource && !loaded) &&
                <Animated.View
                style = {
                    [ style, {
                            backgroundColor: placeholderColor || '#90a4ae',
                            opacity: placeholderOpacity,
                            position: 'absolute',
                            transform: [{
                                scale: placeholderScale
                            }]
                        }
                    ]
                }
                />
            } */}
               
            </View>
                {isNeedShowFull && <ZoomView data={imgDetailsData} modalVisible={modalVisible} onCloseImageView={this.onCloseImageView} /> }
            </View>
        )
    }
}
AsyncImage.defaultProps = {
    isNeedShowFull :false,
    imgDetailsData : []
}

export default AsyncImage