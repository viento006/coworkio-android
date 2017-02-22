import { combineReducers } from 'redux';

import authReducer from '../common/reducers/auth.reducer';
import dashboardReducer from '../common/reducers/dashboard.reducer';
import profileReducer from '../common/reducers/profile.reducer';
import projectReducer from '../common/reducers/project.reducer';
import tasksReducer from '../common/reducers/tasks.reducer';


const reducers = combineReducers({ authReducer, dashboardReducer, profileReducer, projectReducer, tasksReducer });

export default reducers;