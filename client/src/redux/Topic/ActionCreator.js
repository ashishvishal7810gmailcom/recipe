import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const topicLoading = () => ({
    type: ActionTypes.TOPIC_LOADING
});

export const topicFetchFailed = (errmess) => ({
    type: ActionTypes.TOPIC_FETCH_FAILED,
    payload: errmess
});

export const addTopics = (topics) => ({
    type: ActionTypes.ADD_TOPICS,
    payload: topics
});

export const fetchTopics = (courseId, topicId) => (dispatch) => {
    // dispatch(topicLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`sell/${courseId}/${topicId}` ,{
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(topics => {
        // console.log("topicsfetching");
        // console.log(topics);
        dispatch(addTopics(topics));
        
    })
    .catch(error => dispatch(topicFetchFailed(error.message)));
}

export const topicPosting = () => ({
    type: ActionTypes.TOPIC_POSTING
});

export const topicPostFailed = (errmess) => ({
    type: ActionTypes.TOPIC_POST_FAILED,
    payload: errmess
});

export const addTopic = (topic) => ({
    type: ActionTypes.ADD_TOPIC,
    payload: topic
});
export const postTopic = (courseId, topic, history) => (dispatch) => {
    dispatch(topicPosting());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`sell/${courseId}`, {
        method: 'POST',
        body: topic,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(topic => {
        // dispatch(addTopic(topic))
        history.push(`/sell/${courseId}`)
    })
    .catch(error => dispatch(topicPostFailed(error.message)));
}

/* ==============================================
            EDITING TOPIC
============================================== */

export const topicEditPosting = () => ({
    type: ActionTypes.TOPIC_EDIT_POSTING
});

export const topicEditPostFailed = (errmess) => ({
    type: ActionTypes.TOPIC_EDIT_POST_FAILED,
    payload: errmess
});

export const addEdittedTopic = (topic) => ({
    type: ActionTypes.ADD_EDITTED_TOPIC,
    payload: topic
});
export const editTopic = (courseId, topicId, topic, history) => (dispatch) => {
    dispatch(topicEditPosting());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`sell/${courseId}/${topicId}`, {
        method: 'PUT',
        body: topic,
        headers: {
            // 'Content-Type': 'multipart/form-data',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(topic => {
        // dispatch(addEdittedTopic(topic))
        history.push(`/sell/${courseId}/${topicId}`);        
    })
    .catch(error => dispatch(topicEditPostFailed(error.message)));
}



