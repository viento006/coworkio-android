import React from 'react';
import { connect } from 'react-redux';

import EditProfileComponent from './editProfile.component';
import { upsertProfile } from '../../../common/actions/profile.actions';

const mapStateToProps = (state) => {
    return  {
        profile: state.profile.activeProfile,
        newProfile: state.profile.newProfile
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
        onSubmit: (profile) =>  {
            console.log('*******************************************************************')
            console.log('DISPATCHED: EDIT PROFILE *************************************************')
            console.log('*******************************************************************')
            dispatch(upsertProfile(profile))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileComponent);