import React from 'react'
import axios from 'axios'
import { AsyncStorage, Dimensions } from 'react-native'
import _ from 'underscore'
import initialState from '../State'
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


export const getAllItemFromStorage =   async (keyword) => {
   return  await AsyncStorage.getItem(keyword).then((response) => {
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


export const saveItemToStorageNoCheck = (keyword, data) => {
   let newData = { data: data , date: new Date().getTime()}
    console.log('Save New Data', newData)
    AsyncStorage.setItem(keyword, JSON.stringify(newData))
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
  //  console.log('item current Data', item, item.date)
  // let result = item && new Date() - item.date < 400000
    console.log('usedLocal Data', (new Date().getTime() - new Date(item.date).getTime() < 300000))
    return (new Date().getTime() - item.date) < 300000
}

export const checkLocationSaveData =  async (link, functionData, dispatchFunction) => {
        let currentData = await getAllItemFromStorage(link)
        if (currentData && usedLocalData(currentData)) {
            console.log('Use current Data', currentData)
            return dispatchFunction(functionData(currentData));
        } else {
            return axios.get(link)
                .then(res => {
                    saveItemToStorageNoCheck(link, res.data)
                    dispatchFunction(functionData(res));
                })
                .catch(error => {
                    console.log('Error Save', error); //eslint-disable-line
                });
    }
}

export const checkLocationSaveDataNoDispatch = async (link, functionData) => {
    let currentData = await getAllItemFromStorage(link)
    if (currentData && usedLocalData(currentData)) {
        console.log('Use current Data', currentData)
        return functionData(currentData)
    } else {
        return axios.get(link)
            .then(res => {
                saveItemToStorageNoCheck(link, res.data)
                functionData(res)
            })
            .catch(error => {
                console.log('Error Save', error); //eslint-disable-line
            });
    }
}

export const getSettings = async(keyword = null ) => {
    //  'language': 'en-US',
   //  'region': 'US',
    const data = JSON.parse(await AsyncStorage.getItem('Settings')) || initialState['settings']
    console.log('getData', await AsyncStorage.getItem('Settings'), data)
    //const data = await AsyncStorage.getItem('Settings') || JSON.parse(initialState['settings'])
    if (keyword !== null) {
        return data[keyword]
    }
    console.log('Settings Data', data)
    return data
}



module.exports = {
    getLinkImgYoutube,
    formatLinkImg,
    getIdYoutubeLink,
    getItemFromStorage,
    getAllItemFromStorage,
    saveItemToStorage,
    saveItemToStorageNoCheck,
    checkLocationSaveDataNoDispatch,
    mapToJson,
    jsonToMap,
    usedLocalData,
    drawImageScaled,
    checkLocationSaveData,
    getSettings
}