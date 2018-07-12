import axios from 'axios'
import * as types from '../constants/actionTypes'
import Constant from '../utilities/constants'
import { checkLocationSaveData, getSettings } from '../utilities/globalFunction'
import { LANGUAGE_KEY } from '../utilities/constants'
//SAVESTORE
// SEARCH RESULTS
export function retrievePersonSearchResultsSuccess(res) {
    return {
        type: types.RETRIEVE_PERSON_SEARCH_RESULT_SUCCESS,
        searchResults: res.data
    };
}

export function retrievePersonSearchResults(query, page) {
    return   async function (dispatch) {
        // return axios.get(`${Constant.TMDB_URL}/search/person?api_key=${Constant.TMDB_API_KEY}&query=${query}&page=${page}`)
        //     .then(res => {
        //         dispatch(retrievePersonSearchResultsSuccess(res));
        //     })
        //     .catch(error => {
        //         console.log('Person Search Results', error); //eslint-disable-line
        //     });
        let settings = await getSettings(LANGUAGE_KEY);
        return checkLocationSaveData(`${Constant.TMDB_URL}/search/person?api_key=${Constant.TMDB_API_KEY}&query=${query}&language=${settings}&page=${page}`, retrievePersonSearchResultsSuccess, dispatch)
    };
}