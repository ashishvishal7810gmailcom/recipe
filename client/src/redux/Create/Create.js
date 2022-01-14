import * as ActionTypes from './ActionTypes';

export const Recipe = (state = {
        isLoading: false,
        isPosting: false,
        errMess: null,
        isEditing: false,
        recipes: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.SELL_ITEM_LOADING:
            return {...state, isLoading: true,isPosting: false , isEditing: false, errMess: null, recipes: []};
        
        case ActionTypes.SELL_ITEM_FETCH_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload, recipes: []};

        case ActionTypes.ADD_SELL_ITEMS:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null, recipes: action.payload};


        case ActionTypes.SELL_ITEM_POSTING:
            return {...state, isLoading: false,isPosting: true , isEditing: false, errMess: null};
        
        case ActionTypes.SELL_ITEM_POST_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload};

        case ActionTypes.ADD_SELL_ITEM:
            var item = action.payload;
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null,recipes: state.recipes.concat(item)};
        
            
        case ActionTypes.COURSE_EDIT_POSTING:
            return {...state, isLoading: false,isPosting: false , isEditing: true, errMess: null};
        
        case ActionTypes.COURSE_EDIT_POST_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload};

        case ActionTypes.ADD_EDITTED_COURSE:
            var item = action.payload;
            state.recipes = state.recipes.filter((item) => (item._id.toString() != action.payload._id.toString()));
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null,recipes: state.recipes.concat(item)};
            
            
        default:
            return state;
    }
}