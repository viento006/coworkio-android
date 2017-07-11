import React from 'react';
import { connect } from 'react-redux';

import EditTaskComponent from './editTask.component';
import { addTask, updateTask } from '../../../common/actions/task.actions';
import { getUsersProfiles } from '../../../common/actions/profile.actions';

const mapStateToProps = (state) => {
    return  {
        tasks: state.tasks,
        users: state.profile.profilesList
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (task, isEdit) =>  {
            isEdit ? dispatch(updateTask(task)) : dispatch(addTask(task))
        },
        getUsers: () =>  {
            dispatch(getUsersProfiles())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskComponent);