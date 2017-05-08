import React from 'react';
import { connect } from 'react-redux';

import EditTaskComponent from './editTask.component';
import { addTask } from '../../../common/actions/task.actions';

const mapStateToProps = (state) => {
    return  {
        tasks: state.tasks
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (task) =>  {
            console.log('*******************************************************************')
            console.log('DISPATCHED: CREATE\EDIT TASK *************************************************')
            console.log('*******************************************************************')
            dispatch(addTask(task))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskComponent);