import axios from 'axios';

import * as index from './index';
import Constant from './../utilities/constants';
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings } from './../utilities/globalFunction'
import { LANGUAGE_KEY } from './../utilities/constants'
const apiKey = Constant.api_key;
const appendResponse = 'append_to_response=videos,images';

/**
 * HTTP request to fetch shows specified by route argument
 * 
 * @param {string} route - url route for now showing movies
 * @param {string} lan - language
 * @param {string} reg - region
 * @returns {object | promise}
 */
const getShows = async (route, lan, reg) => {
  const uri = `${route}?${apiKey}&language=${lan}&region=${reg}&page=1`
  return axios.get(uri);
}

/**
 * HTTP request to fetch show (movie  tvShow) details for passed value
 * 
 * @param {string} showUrl
 * @param {string} showId
 * 
 * @return {object | Promise}
 */
const getShowDetails = async (showUrl, showId) => {
  let settings = await getSettings(LANGUAGE_KEY);
  return axios.get(`${showUrl}${showId}?${apiKey}&${appendResponse}&language=${settings}`);
}

/**
 * HTTP request to fetch show cast and crew info
 * 
 * @param {string} showUrl
 * @param {string} showId
 * 
 * @return {object | Promise}
 */
const getShowCredits = async (showUrl, showId) => {
  let settings = await getSettings(LANGUAGE_KEY);
  return axios.get(`${showUrl}${showId}/credits?${apiKey}&language=${settings}`);
} 

export {
  getShows,
  getShowDetails,
  getShowCredits
}
