import * as types from '../constants/actionTypes'
import inititalStateNew from '../reducers/inititalStateNew';

export default function (state = inititalStateNew.movies , action) {
    switch(action.type){
        case  types.RETRIEVE_POPULAR_MOVIES_SUCCESS : 
        return {
            ...state,
            popularMovies : action.popularMovies
        }
        case types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS:
        return {
            ...state,
            nowPlayingMovies : action.nowPlayingMovies
        }
        case types.RETRIEVE_MOVIES_GENRES_SUCCESS :
        return {
            ...state,
            genres: action.moviesGenres
        }
        case types.RETRIEVE_MOVIES_LIST_SUCCESS :
        return {
            ...state,
            list: action.list
        }
        case types.RETRIEVE_MOVIE_DETAILS_SUCCESS: 
        return {
            ...state,
            details : action.details
        }
        case types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS:
        return {   
                ...state,
                searchResults: action.searchResults
            }
        case types.RETRIEVE_MOVIE_DETAILS_SIMILAR_SUCCESS:
        return {
            ...state,
            similarmovies: action.similarmovies
        }
        case types.RETRIEVE_MOVIE_DETAILS_REVIEW_SUCCESS:
        return {
            ...state,
            reviewmovies: action.reviewmovies
        }    
        default:
        return state    
    
    }
}