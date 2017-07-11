import React from 'react';
import { connect } from 'react-redux';

import BoardComponent from './board.component';

import { fetchTasksByProjectId, updateTask } from '../../common/actions/task.actions';


const mapStateToProps = (state) => {
    return  {
        tasks: state.tasks.tasksList
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        getTasks: (projectId) => {
            dispatch(fetchTasksByProjectId(projectId));
        },
        updateTask: (task) => {
            dispatch(updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardComponent);