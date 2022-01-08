import * as ActionTypes from './ActionTypes';

export const Suggestions = (state = {
        isLoading: false,
        errMess: null,
        searchTerm: null,
        suggestions: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.SUGGESTIONS_REQUEST:
            return {...state, isLoading: true, errMess: null, searchTerm:action.searchTerm, suggestions: []};

        case ActionTypes.SUGGESTIONS_SUCCESS:
            return {...state, isLoading: false, errMess: null, searchTerm:action.searchTerm, suggestions: action.suggestions};

        case ActionTypes.SUGGESTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.message, searchTerm:action.searchTerm, suggestions: []};

        default:
            return state;
    }
}