import React from 'react'
import { AsyncStorage, Dimensions } from 'react-native'
import _ from 'underscore'
const patternParseYoutube = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
export function getLinkImgYoutube(linkYoutube) {
    let arrMatched = linkYoutube.match(patternParseYoutube)
    // console.log('arrMatched[1]', arrMatched[1])
    let imgLink = arrMatched[1] ? 'https://img.youtube.com/vi/' + arrMatched[1] + '/0.jpg' : null
    // console.log('imgLink' , imgLink)
    return imgLink
}

export function getIdYoutubeLink(linkYoutube) {
    let arrMatched = linkYoutube.match(patternParseYoutube)
    return arrMatched[1] || '70DUmBQytrc'
}

export const formatLinkImg = (linkImg) => {
    // example https://image.tmdb.org/t/p/w185/roYyPiQDQKmIKUEhO912693tSja.jpg
    let link = linkImg
    // alert(link)
    let data = 'https://image.tmdb.org/t/p/w185' + link.slice(link.lastIndexOf('/'))
    return data
}


export const getAllItemFromStorage = (keyword) => {
    AsyncStorage.getItem(keyword).then((response) => {
        const data = JSON.parse(response) || []
        console.log('dataFromStorage', data)
        return data
    })
}

export const saveItemToStorage = (keyword, object) => {
    AsyncStorage.getItem(keyword).then((response) => {
        let data = JSON.parse(response) || []
        console.log('dataFromStorage', data)
        if (data.length) {
            if (_.contains(data, object)) {
                data = _.reject(data, { id: object.id })
            }
            data.push(object)
            AsyncStorage.setItem(keyword, JSON.stringify(data))
        }
    })
}

export const resetItem = (keyword) => {
    AsyncStorage.setItem(keyword, JSON.stringify([]))
}
 //clear all data
 export const cleartItem = async () => {
     await AsyncStorage.clear()
 }
export const getItemFromStorage = (keyword, object) => {
    AsyncStorage.getItem(keyword).then((response) => {
        let data = JSON.parse(response) || []
        console.log('dataFromStorage', data)
        let result = []
        if (data.length) {
            result = _.find(data, { id: object.id })
        }
        return result !== undefined ? result : []
    })
}

export const mapToJson = (map) => {
    return JSON.stringify([...map])
}

export const jsonToMap = (jsonStr) => {
    return new Map(JSON.parse(jsonStr))
}

export const drawImageScaled = (img) => {
    let screenSize = Dimensions.get('window');
    let hRatio = screenSize.width / img.width;
    let vRatio = screenSize.height / img.height;
    let ratio = Math.min(hRatio, vRatio);
    return { width: parseInt(img.width * ratio), height: parseInt(img.height * ratio) };
}

export const usedLocalData = (item) => {
    return new Date() - item.date < 400000
}


module.exports = {
    getLinkImgYoutube,
    formatLinkImg,
    getIdYoutubeLink,
    getItemFromStorage,
    getAllItemFromStorage,
    saveItemToStorage,
    mapToJson,
    jsonToMap,
    usedLocalData,
    drawImageScaled
}