import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../../common/actions/profile.actions';
import { logoutUser } from '../../common/actions/auth.actions';

import MenuComponent from './menu.component';


const mapStateToProps = (state) => {
    return  {
        profile: state.profile.activeProfile
    }
 }

const mapDispatchToProps = (dispatch) => {
    return  {
        fetchProfile: () => { 
            dispatch(fetchProfile()) 
        },
        dispatchLogOut: () => {
            dispatch(logoutUser()) 
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)