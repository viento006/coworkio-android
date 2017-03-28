import React from 'react'
import { Provider } from 'react-redux';

import configureStore from './store';
import authInterceptor from './auth.interceptor';
import Navigation from './navigation';

authInterceptor();
const store = configureStore();

const App  = () => (
    <Provider store={ store }>
        <Navigation></Navigation>
    </Provider>
);

export default App;