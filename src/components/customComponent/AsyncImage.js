

import React, { Component } from 'react'
import {
    Icon
} from 'react-native-elements'
import {
    Animated,
    View
} from 'react-native'
// import { formatLinkImg } from '../.././utilities/globalFunction'

export default class AsyncImage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            imageOpacity: props.placeholderSource ?
                new Animated.Value(1.0) :
                new Animated.Value(0.0),
            placeholderOpacity: new Animated.Value(1.0),
            placeholderScale: new Animated.Value(1.0)
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
    render() {
        const {
            placeholderColor,
            placeholderSource,
            style,
            source,
            isYoutubeIcon
        } = this.props
       // let sourceData = formatLinkImg(source)
        const {
            imageOpacity,
            loaded,
            placeholderOpacity,
            placeholderScale
        } = this.state

        return ( 
            <View style = {[style,{backgroundColor : 'transparent' ,alignItems:'center', justifyContent: 'center' , borderRadius : 0 }]} >
                <Animated.Image source={source }
            index= {Math.random(100).toString()}
            resizeMode = {
                'cover'
            }
            style = {
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
            onLoad = {
                this._onLoad
            } />
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
                            position: 'absolute'
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
        )
    }

    
}