import React from 'react';
import { connect } from 'react-redux';

import { findProject } from '../../common/actions/project.actions';

import SearchComponent from './search.component';


const mapStateToProps = (state) => {
    return  {
        projects: state.projects.foundProjects
    }
 }

const mapDispatchToProps = (dispatch) => {
    return  {
        search: (searchString) => { 
            dispatch(findProject(searchString))
        },
        
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)