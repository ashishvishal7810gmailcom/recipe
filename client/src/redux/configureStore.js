import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './AuthSuggestions/auth';
import { Suggestions } from './AuthSuggestions/suggestions';
import { Recipe } from './Create/Create';
import { Recipes } from './Recipe/Recipes';
import { SingleRecipe } from './Recipe/Recipe';
import { Searches } from './AuthSuggestions/search';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            suggestions: Suggestions,
            recipe: Recipe,
            recipes: Recipes,
            singleRecipe: SingleRecipe,
            searches: Searches
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}