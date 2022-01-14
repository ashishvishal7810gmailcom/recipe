import * as ActionTypes from './ActionTypes';

export const SingleRecipe = (state = {
        isLoading: false,
        errMess: null,
        recipe: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.RECIPE_LOADING:
            return {...state, isLoading: true, errMess: null, recipe: []};
        
        case ActionTypes.RECIPE_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, recipe: []};
        
        case ActionTypes.ADD_RECIPE:
            console.log(action.payload);
            const item = action.payload;
            console.log(item);
            return {...state, isLoading: false, errMess: null, recipe: action.payload};

        default:
            return state;
    }
}