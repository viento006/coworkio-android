import React from 'react';
import { connect } from 'react-redux';

import EditProjectComponent from './editProject.component';
import { createProject } from '../../../common/actions/project.actions';

const mapStateToProps = (state) => {
    return  {
        projects: state.projects
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (project) =>  {
            console.log('*******************************************************************')
            console.log('DISPATCHED: CREATE\EDIT PROJECT *************************************************')
            console.log('*******************************************************************')
            dispatch(createProject(project))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComponent);