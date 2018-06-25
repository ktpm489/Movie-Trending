import axios from 'axios'
import * as types from '../constants/actionTypes'
import Constant from '../utilities/constants'

// TV SIMILAR

export function retrieveTVSimilarSuccess(res) {
    return {
        type: types.RETRIEVE_TV_DETAILS_SIMILAR_SUCCESS,
        similartv: res.data
    };
}

export function retrieveTVSimilarDetails(tvId, page) {
    return function (dispatch) {
        console.log('Link Similar', `${Constant.TMDB_URL}/tv/${tvId}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`)
        return axios.get(`${Constant.TMDB_URL}/tv/${tvId}/similar?api_key=${Constant.TMDB_API_KEY}&language=en-US&page=${page}`)
            .then(res => {
                dispatch(retrieveTVSimilarSuccess(res));
            })
            .catch(error => {
                console.log('TV  Similar Details', error); //eslint-disable-line
            });
    };
}



