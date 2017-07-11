import React from 'react';
import { connect } from 'react-redux';

import { fetchTask } from '../../../common/actions/task.actions';

import ViewTaskComponent from './viewTask.component';


const mapStateToProps = (state) => {
    return  {
        task: state.tasks.activeTask
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        getTask: (taskId) =>  {
            dispatch(fetchTask(taskId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewTaskComponent);