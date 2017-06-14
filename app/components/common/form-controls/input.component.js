import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';

import colors from '../../../styles/colors';


export default class InputComponent extends Component {
    errorMessage = '';

    constructor(props) {
        super(props)
    }

    obfuscate(value) {
        return new Array(value.length + 1).join( '*' );
    }

    validate(value){
        if(this.props.required && !value){
            this.errorMessage = `Пожалуйста, введите значение поля ${this.props.title}`;
            return true;
        }
        this.errorMessage = '';
        return false;
    }

    onChangeText(value) {
        this.props.onChangeText(value, this.validate(value));
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                { this.props.title && <Text style={styles.title}>{this.props.title}</Text> }
                { this.props.multiline ?
                    <TextInput style={styles.input} onChangeText={this.onChangeText.bind(this)} keyboardType={this.props.keyboardType}
                            autocorrect={false} secureTextEntry={this.props.secureTextEntry} multiline={true}>
                        <Text style={styles.value}>{this.props.value}</Text>
                    </TextInput> :
                    <View style={styles.inputContainer}>
                        <Text style={styles.value} numberOfLines={1} >
                        { this.props.secureTextEntry? this.obfuscate(this.props.value): this.props.value}</Text>
                        <TextInput style={styles.input} onChangeText={this.onChangeText.bind(this)} maxLength={30}
                            autocorrect={false} keyboardType={this.props.keyboardType}>
                            <Text style={styles.hiddenValue}>{this.props.value}</Text>
                        </TextInput>
                    </View>
                }
                { (!!this.errorMessage) && <Text style={styles.validationMessage}>{this.errorMessage}</Text> }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginTop: 5,
        marginBottom: 5,
    },
    inputContainer:{
        flexDirection:'row',
        alignItems: 'baseline',
    },
    title:{
        fontWeight: 'bold',
        color: colors.blockTitle,
    },
    value:{
        paddingBottom:10,
        color: colors.blockContent,
    },
    hiddenValue:{
        fontSize: 0,
        width: 0,
        color: colors.cardBackground
    },
    input:{
        flex:1,
        marginTop: -10,
        minWidth:20
    },
    validationMessage: {
        color: colors.validation
    }
})
