import axios from 'axios'
import * as types from '../constants/actionTypes'
import Constant from '../utilities/constants'
import { checkLocationSaveData } from '../utilities/globalFunction'
//SAVESTORE
// SEARCH RESULTS
export function retrievePersonSearchResultsSuccess(res) {
    return {
        type: types.RETRIEVE_PERSON_SEARCH_RESULT_SUCCESS,
        searchResults: res.data
    };
}

export function retrievePersonSearchResults(query, page) {
    return function (dispatch) {
        // return axios.get(`${Constant.TMDB_URL}/search/person?api_key=${Constant.TMDB_API_KEY}&query=${query}&page=${page}`)
        //     .then(res => {
        //         dispatch(retrievePersonSearchResultsSuccess(res));
        //     })
        //     .catch(error => {
        //         console.log('Person Search Results', error); //eslint-disable-line
        //     });
        return checkLocationSaveData(`${Constant.TMDB_URL}/search/person?api_key=${Constant.TMDB_API_KEY}&query=${query}&page=${page}`, retrievePersonSearchResultsSuccess, dispatch)
    };
}