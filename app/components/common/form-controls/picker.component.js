import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Picker } from 'react-native';

import colors from '../../../styles/colors';

export default class InputComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            value: props.value
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Picker selectedValue={this.state.value}
                    onValueChange={this.props.onValueChange}>
                    {this.props.items.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 15,
        borderBottomWidth: 0.5,
        borderColor: colors.inputUnderline,
    },
    title:{
        fontWeight: 'bold',
        color: colors.blockTitle,
    },
    value:{
        color: colors.blockContent,
    },
})
