import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';

import colors from '../../../styles/colors';

export default class InputComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            value: props.value
        };
    }

    onChangeText(text){
        this.props.onChangeText(text);
        this.setState({value: text});
    }
    obfuscate(value){
        return new Array(value.length + 1).join( '*' );
    }
    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.value} numberOfLines={1} >
                    { this.props.secureTextEntry? this.obfuscate(this.state.value): this.state.value}</Text>
                    <TextInput style={styles.input} onChangeText={this.onChangeText.bind(this)} maxLength={30}
                        autocorrect={false}>
                        <Text style={styles.hiddenValue}>{this.props.value}</Text>
                    </TextInput>
                </View>
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
        width: 0
    },
    input:{
        flex:1,
        marginTop: -10,
        minWidth:20
    },
})
