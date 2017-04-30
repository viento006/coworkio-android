import React from 'react';
import { connect } from 'react-redux';

import ProjectListComponent from './projectList.component';
import { fetchProjectsByUser } from '../../../common/actions/dashboard.actions';

const mapStateToProps = (state) => {
    return  {
        projects: state.dashboard.projectsList
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        fetchProjectsByUser: () => { 
            dispatch(fetchProjectsByUser()) 
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListComponent)