import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';

/* ===========================================
            Multipple Recipe Loading
=============================================*/

export const recipesLoading = () => ({
    type: ActionTypes.RECIPES_LOADING
});

export const recipesFetchFailed = (errmess) => ({
    type: ActionTypes.RECIPES_FETCH_FAILED,
    payload: errmess
});

export const addRecipes = (recipes) => ({
    type: ActionTypes.ADD_RECIPES,
    payload: recipes
});

export const fetchRecipes = (initialRoute) => (dispatch) => {
    dispatch(recipesLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}` ,{
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
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
    .then(recipes => dispatch(addRecipes(recipes)))
    .catch(error => dispatch(recipesFetchFailed(error.message)));
}

/* ===========================================
            Single Recipe Fetch
=============================================*/

export const recipeLoading = () => ({
    type: ActionTypes.RECIPE_LOADING
});

export const recipeFetchFailed = (errmess) => ({
    type: ActionTypes.RECIPE_FETCH_FAILED,
    payload: errmess
});

export const addRecipe = (recipe) => ({
    type: ActionTypes.ADD_RECIPE,
    payload: recipe
});

export const fetchRecipe = (initialRoute, recipeId) => (dispatch) => {
    dispatch(recipeLoading());
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl+`${initialRoute}/${recipeId}` ,{
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response);
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        console.log(error);
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(recipe => {
        console.log(recipe);
        dispatch(addRecipe(recipe))
    })
    .catch(error => dispatch(recipeFetchFailed(error.message)));
}