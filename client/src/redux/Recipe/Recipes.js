import * as ActionTypes from './ActionTypes';

export const Recipes = (state = {
        isLoading: false,
        errMess: null,
        recipes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.RECIPES_LOADING:
            return {...state, isLoading: true, errMess: null, recipes: []};
        
        case ActionTypes.RECIPES_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, recipes: []};

        
        case ActionTypes.ADD_RECIPES:
            return {...state, isLoading: false, errMess: null, recipes: action.payload};
         
        default:
            return state;
    }
}