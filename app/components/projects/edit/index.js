import React from 'react';
import { connect } from 'react-redux';

import EditProjectComponent from './editProject.component';
import { loginUser } from '../../../common/actions/auth.actions';

const mapStateToProps = (state) => {
    return  {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (credentials) =>  {
            console.log('*******************************************************************')
            console.log('DISPATCHED: LOGIN *************************************************')
            console.log('*******************************************************************')
            dispatch(loginUser(credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProjectComponent);