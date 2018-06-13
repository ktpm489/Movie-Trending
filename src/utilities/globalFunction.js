import React from 'react'
const patternParseYoutube = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
export function getLinkImgYoutube(linkYoutube) {
    let arrMatched = linkYoutube.match(patternParseYoutube)
    console.log('arrMatched[1]', arrMatched[1])
    let imgLink = arrMatched[1] ? 'https://img.youtube.com/vi/' + arrMatched[1] + '/0.jpg' : null
    console.log('imgLink' , imgLink)
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

module.exports = {
    getLinkImgYoutube,
    formatLinkImg,
    getIdYoutubeLink
}