import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

export const itemLoading = () => ({
    type: ActionTypes.SELL_ITEM_LOADING
});

export const itemFetchFailed = (errmess) => ({
    type: ActionTypes.SELL_ITEM_FETCH_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_SELL_ITEMS,
    payload: items
});

export const fetchRecipes = () => (dispatch) => {
    dispatch(itemLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+'create' ,{
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
    .then(items => dispatch(addItems(items)))
    .catch(error => dispatch(itemFetchFailed(error.message)));
}

export const itemPosting = () => ({
    type: ActionTypes.SELL_ITEM_POSTING
});

export const itemPostFailed = (errmess) => ({
    type: ActionTypes.SELL_ITEM_POST_FAILED,
    payload: errmess
});

export const addItem = (item) => ({
    type: ActionTypes.ADD_SELL_ITEM,
    payload: item
});
export const postItem = (item, history) => (dispatch) => {
    dispatch(itemPosting());
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'create', {
        method: 'POST',
        body: item,
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
    .then(item => {
        dispatch(addItem(item))
        history.push(`/create/${item._id}`)
    })
    .catch(error => dispatch(itemPostFailed(error.message)));
}

/* ==============================================
            EDITING COURSE
============================================== */

export const courseEditPosting = () => ({
    type: ActionTypes.COURSE_EDIT_POSTING
});

export const courseEditPostFailed = (errmess) => ({
    type: ActionTypes.COURSE_EDIT_POST_FAILED,
    payload: errmess
});

export const addEdittedCourse = (course) => ({
    type: ActionTypes.ADD_EDITTED_COURSE,
    payload: course
});
export const editRecipe = (item, recipeId, history) => (dispatch) => {
    // dispatch(courseEditPosting());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`create/${recipeId}`, {
        method: 'PUT',
        body: item,
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
    .then(course => {
        history.push(`/create/${recipeId}`);
        dispatch(addEdittedCourse(course))
    })
    .catch(error => dispatch(courseEditPostFailed(error.message)));
}

/* ==============================================
            DELETE COURSE
============================================== */

export const deleteRecipe = (recipeId, history) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`create/${recipeId}`, {
        method: 'DELETE',
        headers: {
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
    .then(response => {
        alert("Delete SuccessFul");
        history.push(`/create`);
    })
    .catch(error => alert(error.message));
}


