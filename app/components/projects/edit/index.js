import React from 'react';
import { connect } from 'react-redux';

import EditProjectComponent from './editProject.component';
import { createProject } from '../../../common/actions/project.actions';
import { getUsersProfiles } from '../../../common/actions/profile.actions';


const mapStateToProps = (state) => {
    return  {
        projects: state.projects,
        users: state.profile.profilesList
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (project) =>  {
            dispatch(createProject(project))
        },
        getUsers: () =>  {
            dispatch(getUsersProfiles())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComponent);