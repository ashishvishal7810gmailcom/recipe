import * as ActionTypes from './ActionTypes';

export const Topic = (state = {
        isLoading: false,
        isPosting: false,
        errMess: null,
        isEditing: false,
        topics: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.TOPIC_LOADING:
            return {...state, isLoading: true,isPosting: false , isEditing: false, errMess: null, topics: []};
        
        case ActionTypes.TOPIC_FETCH_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload, topics: []};

        case ActionTypes.ADD_TOPICS:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null, topics: action.payload};


        case ActionTypes.TOPIC_POSTING:
            return {...state, isLoading: false,isPosting: true , isEditing: false, errMess: null};
        
        case ActionTypes.TOPIC_POST_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload};

        case ActionTypes.ADD_TOPIC:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null, topics: action.payload};
            // var item = action.payload;
            // return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null,topics: state.topics.push(item)};
        
            
        case ActionTypes.TOPIC_EDIT_POSTING:
            return {...state, isLoading: false,isPosting: false , isEditing: true, errMess: null};
        
        case ActionTypes.TOPIC_EDIT_POST_FAILED:
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: action.payload};

        case ActionTypes.ADD_EDITTED_TOPIC:
            var topic = action.payload;
            state.topics = state.topics.filter((topic) => (topic._id.toString() != action.payload._id.toString()));
            return {...state, isLoading: false, isPosting: false, isEditing: false, errMess: null,topics: state.topics.concat(topic)};
            
            
        default:
            return state;
    }
}