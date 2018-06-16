
const imageLoading = require('../Assets/Image/Loading.gif')
export const getUriPopulated = (shows, config, key) => {
  const {image} = config
  // decipher imageType from key
  const imageType = key.substring(0, key.indexOf('S'))

  return shows.map((show) => {
    //const path = show['file_path'] || show[`${imageType}_path`] || show['backdrop_path'] || show['poster_path']
   // const path = show['poster_path'] || show['backdrop_path'] || show['file_path'] || show[`${imageType}_path`]
    const path = show['file_path'] || show[`${imageType}_path`] || show['poster_path'] || show['backdrop_path'] 
    // console.log('show',  show, imageType,  show['file_path'] , show[`${imageType}_path`])
     if (path === ' null ' || path === '' || path === null) {
      // console.log('path', path)
       show['uri'] = 'https://image.tmdb.org/t/p/w185/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'
      return show
      }
    let imageLink = image.secureBaseUrl ? image.secureBaseUrl : 'https://image.tmdb.org/t/p/'
   show['uri'] = `${imageLink}${'w185'}${path}`
    return show
  })
}

String.prototype.toCategory = function () {
  return this.replace(/ /g, '').replace(/(.)/, c => c.toLowerCase())
}

String.prototype.toUnderScore = function () {
  return this.replace(/([A-Z])/g, '_$1')
}
