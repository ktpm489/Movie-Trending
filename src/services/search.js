import axios from 'axios';

import * as index from './index';
import Constant from './../utilities/constants';
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings } from './../utilities/globalFunction'
import { LANGUAGE_KEY } from './../utilities/constants'
const { lan_region, api_key } = Constant;
const searchUrl = '/search/multi';


/**
 * HTTP request to search item in The MovieDB
 * 
 * @param {string} searchQuery
 * @returns {object | Promise}
 */
const searchItem = async (searchQuery) => {
  let settings = await getSettings(LANGUAGE_KEY);
  return axios.get(`${searchUrl}?${api_key}${lan_region}&query=${encodeURIComponent(searchQuery)}&language=${settings}`)
}

export {
  searchItem
}
