import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './AuthSuggestions/auth';
import { Suggestions } from './AuthSuggestions/suggestions';
import { SellItem } from './Sell/SellItem';
import { Topic } from './Topic/Topic';
import { EditTopic } from './EditTopic/Topic';
import { Courses } from './Courses/Courses';
import { Course } from './Courses/Course';
import { TopicTheory } from './Courses/TopicTheory';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            auth: Auth,
            suggestions: Suggestions,
            sellItem: SellItem,
            topics: Topic,
            editTopic: EditTopic,
            courses: Courses,
            course: Course,
            topicTheory: TopicTheory
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}