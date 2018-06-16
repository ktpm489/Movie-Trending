

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
export default class AsyncImage extends Component {

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
    _onLoad = () => {
        const {
            placeholderScale,
            placeholderOpacity,
            imageOpacity
        } = this.state

        Animated.sequence([
            Animated.parallel([
                Animated.timing(placeholderScale, {
                    toValue: 0.7,
                    duration: 100,
                    useNativeDriver: true
                }),
                Animated.timing(placeholderOpacity, {
                    toValue: 0.66,
                    duration: 100,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.parallel([
                    Animated.timing(placeholderOpacity, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true
                    }),
                    Animated.timing(placeholderScale, {
                        toValue: 1.2,
                        duration: 200,
                        useNativeDriver: true
                    }),
                ]),
                Animated.timing(imageOpacity, {
                    toValue: 1.0,
                    delay: 200,
                    duration: 300,
                    useNativeDriver: true
                })
            ])
        ]).start(() => {
            this.setState(() => ({
                loaded: true
            }))
        })
    }


    pressItem = () => {
        const { isNeedShowFull, imgDetailsData } = this.props
        console.log("Press Item", this.state.loaded , imgDetailsData , imgDetailsData.length > 0)
        if (this.state.loaded && imgDetailsData && imgDetailsData.length > 0) {
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
            isNeedShowFull
        } = this.props
        const {
            imageOpacity,
            loaded,
            placeholderOpacity,
            placeholderScale,
            modalVisible
        } = this.state

        return ( 
            <View style={[style, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }]} >
             <View style={[style, { backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }]} >
                {isNeedShowFull ? 
                    <TouchableWithoutFeedback onPress={this.pressItem}>
                        <Animated.Image source={source}
                            index={Math.random(100).toString()}
                            resizeMode={
                                'cover'
                            }
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
                            onLoad={
                                this._onLoad
                            } />
                    </TouchableWithoutFeedback>
                
                : 
                    
                    <Animated.Image source={source}
                        index={Math.random(100).toString()}
                        resizeMode={
                            'cover'
                        }
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
                        onLoad={
                            this._onLoad
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
            {
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
            }
               
            </View>
            <ZoomView data={imgDetailsData} modalVisible={modalVisible} />
            </View>
        )
    }

    
}