import React from 'react';
import { connect } from 'react-redux';

import LoginComponent from './login.component';
import { loginUser } from '../../../common/actions/auth.actions';


const mapStateToProps = (state) => {
    return  {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (credentials) =>  {
            dispatch(loginUser(credentials))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);