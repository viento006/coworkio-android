import { combineReducers } from 'redux';

import auth from '../common/reducers/auth.reducer';
import dashboard from '../common/reducers/dashboard.reducer';
import profile from '../common/reducers/profile.reducer';
import projects from '../common/reducers/project.reducer';
import tasks from '../common/reducers/tasks.reducer';


const reducers = combineReducers({ auth, dashboard, profile, projects, tasks});

export default reducers;