import * as ActionTypes from './ActionTypes';

export const Course = (state = {
        isLoading: false,
        errMess: null,
        course: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.COURSE_LOADING:
            return {...state, isLoading: true, errMess: null, course: []};
        
        case ActionTypes.COURSE_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, course: []};
        
        case ActionTypes.ADD_COURSE:
            return {...state, isLoading: false, errMess: null, course: action.payload};

        default:
            return state;
    }
}