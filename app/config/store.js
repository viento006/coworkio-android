import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = function() {
    const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunkMiddleware, promiseMiddleware())
        )
    );
    return store;
}
export default configureStore;