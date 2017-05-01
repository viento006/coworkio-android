import React from 'react';
import { connect } from 'react-redux';

import BoardComponent from './board.component';

import { fetchTasksByProjectId } from '../../common/actions/task.actions';

const mapStateToProps = (state) => {
    return  {
        tasks: state.tasks.tasksList
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        getTasks: (projectId) =>  {
            dispatch(fetchTasksByProjectId(projectId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardComponent);