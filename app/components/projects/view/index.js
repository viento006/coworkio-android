import React from 'react';
import { connect } from 'react-redux';

import { fetchProject } from '../../../common/actions/project.actions';

import ViewProjectComponent from './viewProject.component';


const mapStateToProps = (state) => {
    return  {
        project: state.projects.activeProject
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        getProject: () =>  {
            dispatch(fetchProject())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProjectComponent);