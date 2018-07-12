import axios from 'axios';

import * as index from './index';
import Constant from './../utilities/constants';
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings } from './../utilities/globalFunction'
import { LANGUAGE_KEY } from './../utilities/constants'
const apiKey = Constant.api_key;

/**
 * HTTP request to get cast details
 * 
 * @param {number} castId
 * @returns {object | promise}
 */
const getCastDetails = async (castId) => {
  let settings = await getSettings(LANGUAGE_KEY);
  return axios.get(`/person/${castId}?${apiKey}&language=${settings}`)
}

export {
  getCastDetails
}
