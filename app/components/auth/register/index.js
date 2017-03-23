import React from 'react';
import { connect } from 'react-redux';

import RegisterComponent from './register.component';
import { registerUser } from '../../../common/actions/auth.actions';

const mapStateToProps = (state) => {
    return  {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (credentials, navigate) =>  {
            dispatch(registerUser(credentials));
        } 
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);