import * as ActionTypes from './ActionTypes';
import isEqual from 'lodash.isequal';

export const Courses = (state = {
        isLoading: false,
        errMess: null,
        courses: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.COURSES_LOADING:
            return {...state, isLoading: true, errMess: null, courses: []};
        
        case ActionTypes.COURSES_FETCH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, courses: []};

        
        case ActionTypes.ADD_COURSES:
            return {...state, isLoading: false, errMess: null, courses: action.payload};
         
        default:
            return state;
    }
}