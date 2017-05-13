import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class SubmitButtonComponent extends Component {
    submit(){
        if(!this.props.isLoading){
            this.props.onPress();
        }
    }

    render() {
        let isSubmit = this.props.isSubmit !== false;
        return (
            <Button disabled={this.props.disabled} containerStyle={[formControlStyles.buttonContainer, 
                isSubmit ? formControlStyles.submitButtonContainer : {}, this.props.disabled ? {backgroundColor: colors.cardBackground} : {}]} 
                    style={[formControlStyles.buttonContent, isSubmit ? formControlStyles.submitButtonContent : {}]} onPress={this.submit.bind(this)}>
                {this.props.isLoading 
                    ? <ActivityIndicator  color="#fff" animating={true} />
                    : this.props.title
                }
            </Button>
        )
    }
}
