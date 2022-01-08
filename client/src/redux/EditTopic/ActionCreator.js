import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

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
        history.push(`/sell/${courseId}/${topicId}`);
    }
    )
    .catch(error => dispatch(topicEditPostFailed(error.message)));
}



