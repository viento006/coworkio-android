import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../../../common/actions/profile.actions';

import ViewProfileComponent from './viewProfile.component';


const mapStateToProps = (state) => {
    return  {
        profile: state.profile.activeProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        getProfile: () =>  {
            dispatch(fetchProfile())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileComponent);