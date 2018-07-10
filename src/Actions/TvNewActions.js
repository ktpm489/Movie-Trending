import axios from 'axios'
import * as types from '../constants/actionTypes'
import Constant from '../utilities/constants'
import { checkLocationSaveData } from '../utilities/globalFunction'
//SAVESTORE
// TV SIMILAR

export function retrieveTVSimilarSuccess(res) {
    return {
        type: types.RETRIEVE_TV_DETAILS_SIMILAR_SUCCESS,
        similartv: res.data
    };
}

export function retrieveTVSimilarDetails(tvId, page) {
    return function (dispatch) {
        // console.log('Link Similar', `${Constant.TMDB_URL}/tv/${tvId}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`)
        // return axios.get(`${Constant.TMDB_URL}/tv/${tvId}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`)
        //     .then(res => {
        //         dispatch(retrieveTVSimilarSuccess(res));
        //     })
        //     .catch(error => {
        //         console.log('TV  Similar Details', error); //eslint-disable-line
        //     });
        return checkLocationSaveData(`${Constant.TMDB_URL}/tv/${tvId}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`, retrieveTVSimilarSuccess, dispatch)
    };
}

// SEARCH RESULTS
export function retrieveTVSearchResultsSuccess(res) {
    return {
        type: types.RETRIEVE_TV_SEARCH_RESULT_SUCCESS,
        searchResults: res.data
    };
}

export function retrieveTVSearchResults(query, page) {
    return function (dispatch) {
        // return axios.get(`${Constant.TMDB_URL}/search/tv?api_key=${Constant.TMDB_API_KEY}&query=${query}&page=${page}`)
        //     .then(res => {
        //         dispatch(retrieveTVSearchResultsSuccess(res));
        //     })
        //     .catch(error => {
        //         console.log('TV Search Results', error); //eslint-disable-line
        //     });
        return checkLocationSaveData(`${Constant.TMDB_URL}/search/tv?api_key=${Constant.TMDB_API_KEY}&query=${query}&page=${page}`, retrieveTVSearchResultsSuccess, dispatch)
    };
}

