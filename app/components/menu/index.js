import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../../common/actions/profile.actions';

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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)