
const imageLoading = require('../Assets/Image/Loading.gif')
export const getUriPopulated = (shows, config, key) => {
  const {image} = config
  // decipher imageType from key
  // ex: posterSizeForImageList, extract poster from string
  const imageType = key.substring(0, key.indexOf('S'))

  return shows.map((show) => {
    const path = show['file_path'] || show[`${imageType}_path`]
    //show['uri'] = `${image.secureBaseUrl}${image[key]}${path}`
    // to do check here 
   
    // if (path === null) {
    //   show['uri'] = imageLoading
    // } else {
    //   //let key= 'w185'
    //if (!image.secureBaseUrl){
    console.log('AA', image.secureBaseUrl)
    let imageLink = image.secureBaseUrl ? image.secureBaseUrl : 'https://image.tmdb.org/t/p/'
    //show['uri'] = `${imageLink}${'w300'}${path}` 
   show['uri'] = `${imageLink}${'w185'}${path}`
    // }
    console.log('SHow', show['uri'])
    return show
  })
}

String.prototype.toCategory = function () {
  return this.replace(/ /g, '').replace(/(.)/, c => c.toLowerCase())
}

String.prototype.toUnderScore = function () {
  return this.replace(/([A-Z])/g, '_$1')
}
