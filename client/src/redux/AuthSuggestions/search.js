import * as ActionTypes from './ActionTypes';

export const Searches = (state = {
        isLoading: false,
        errMess: null,
        searchTerm: null,
        searchResult: null,
        hasMore: true
    }, action) => {
    switch(action.type) {
        case ActionTypes.SEARCH_REQUEST:
            return {...state, isLoading: true, errMess: null, searchTerm:action.searchTerm, searchResult: null,hasMore: true};
        default:
            return state;
    }
}