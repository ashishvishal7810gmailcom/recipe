import * as ActionTypes from './ActionTypes';

export const EditTopic = (state = {
        errMess: null,
        isEditing: false
    }, action) => {
    switch(action.type) {
            
        case ActionTypes.TOPIC_EDIT_POSTING:
            return {...state, isEditing: true, errMess: null};
        
        case ActionTypes.TOPIC_EDIT_POST_FAILED:
            return {...state, isEditing: false, errMess: action.payload};    
            
        default:
            return state;
    }
}