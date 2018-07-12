import axios from 'axios';

import * as index from './index';
import Constant from './../utilities/constants';
import { checkLocationSaveData, saveItemToStorageNoCheck, usedLocalData, getAllItemFromStorage, getSettings } from './../utilities/globalFunction'
import { LANGUAGE_KEY } from './../utilities/constants'
const apiKey = Constant.api_key

/**
 * HTTP request to get season details
 * 
 * @param {number} tvShowId
 * @param {number} season_number
 * @returns {object|promise}
 */
const getSeasonDetails = async (tvShowId, season_number) => {
  let settings = await getSettings(LANGUAGE_KEY);
  const seasonAPI = `/tv/${tvShowId}/season/${season_number}`
  const seasonUrl = `${seasonAPI}?${apiKey}&language=${settings}`

  return axios.get(seasonUrl);
}

export {
  getSeasonDetails
}
