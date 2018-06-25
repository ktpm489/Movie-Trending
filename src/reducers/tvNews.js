import * as types from '../constants/actionTypes'
import inititalStateNew from '../reducers/inititalStateNew';

export default function (state = inititalStateNew.movies, action) {
    switch (action.type) {
        case types.RETRIEVE_TV_DETAILS_SIMILAR_SUCCESS:
            return {
                ...state,
                similartv: action.similartv
            }
        
        default:
            return state

    }
}