import React from 'react'
import { Provider } from 'react-redux';
import configureStore from './store';

import Navigation from './navigation'

const store = configureStore();

const App  = () => (
    <Provider store={ store }>
        <Navigation></Navigation>
    </Provider>
);

export default App;