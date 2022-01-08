import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/* ===========================================
            Multipple Course Loading
=============================================*/

export const coursesLoading = () => ({
    type: ActionTypes.COURSES_LOADING
});

export const coursesFetchFailed = (errmess) => ({
    type: ActionTypes.COURSES_FETCH_FAILED,
    payload: errmess
});

export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
});

export const fetchCourses = (initialRoute) => (dispatch) => {
    // dispatch(coursesLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}` ,{
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
    .then(courses => dispatch(addCourses(courses)))
    .catch(error => dispatch(coursesFetchFailed(error.message)));
}
/* ===========================================
            Course Purchase
=============================================*/
export const purchaseCourse = (initialRoute, courseId, history) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}/${courseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
            console.log(response.body);
          var error = new Error('Error ' + response.status + ': ' + response.statusText+ ' '+ response.body.err);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(success => {
        alert("course Bought");
        history.push(`/purchased/${courseId}`);
    })
    .catch(error => {
        alert(error.message);
        // console.log(error.message);
    });

}

/* ===========================================
            Single Course Fetch
=============================================*/

export const courseLoading = () => ({
    type: ActionTypes.COURSE_LOADING
});

export const courseFetchFailed = (errmess) => ({
    type: ActionTypes.COURSE_FETCH_FAILED,
    payload: errmess
});

export const addCourse = (course) => ({
    type: ActionTypes.ADD_COURSE,
    payload: course
});

export const fetchCourse = (initialRoute, courseId) => (dispatch) => {
    // dispatch(courseLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}/${courseId}` ,{
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
    .then(course => dispatch(addCourse(course)))
    .catch(error => dispatch(courseFetchFailed(error.message)));
}

/* ===========================================
            Topic Theory Fetch
=============================================*/


export const topicLoading = () => ({
    type: ActionTypes.TOPIC_THEORY_LOADING
});

export const topicFetchFailed = (errmess) => ({
    type: ActionTypes.TOPIC_THEORY_FETCH_FAILED,
    payload: errmess
});

export const addTopic = (topic) => ({
    type: ActionTypes.ADD_TOPIC_THEORY,
    payload: topic
});

export const fetchTopicTheory = (initialRoute, courseId, topicId) => (dispatch) => {
    // dispatch(topicLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}/${courseId}/${topicId}` ,{
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
    .then(topic => {
        // console.log("topicsfetching");
        // console.log(topics);
        dispatch(addTopic(topic));
        
    })
    .catch(error => dispatch(topicFetchFailed(error.message)));
}