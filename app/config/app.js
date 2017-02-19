import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';
import MainComponent from '../components/main/main.component'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
        reducers,
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        )
);

const App  = () => (
    <Provider store={store}>
        <MainComponent text="Hello from app!"></MainComponent>
    </Provider>
);

export default App;