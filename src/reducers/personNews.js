import * as types from '../constants/actionTypes'
import inititalStateNew from '../reducers/inititalStateNew';

export default function (state = inititalStateNew.person, action) {
    switch (action.type) {
        case types.RETRIEVE_PERSON_SEARCH_RESULT_SUCCESS:
            return {
                ...state,
                searchResults: action.searchResults
            }
        default:
            return state

    }
}