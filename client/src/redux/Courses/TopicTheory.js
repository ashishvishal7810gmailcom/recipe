import * as ActionTypes from './ActionTypes';

export const TopicTheory = (state = {
        isLoading: false,
        errMess: null,
        topic: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.TOPIC_THEORY_LOADING:
            return {...state, isLoading: true, errMess: null, topic: []};
        
        case ActionTypes.TOPIC_THEORY_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, topic: []};

        case ActionTypes.ADD_TOPIC_THEORY:
            return {...state, isLoading: false, errMess: null, topic: action.payload};
            
        default:
            return state;
    }
}