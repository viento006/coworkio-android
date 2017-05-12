import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, DatePickerAndroid } from 'react-native';

import colors from '../../../styles/colors';

export default class DatepickerComponent extends Component {
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

    showPicker = async (key) => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open();
            if (action === DatePickerAndroid.dismissedAction) {
            } else {
                let date = new Date(year, month, day);
                this.props.onChange(date);
            }
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    formatDate(date){
        return date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : 'Выберите дату';
    }

    render() {
        return (
            <TouchableOpacity style={[this.props.style, styles.container]} onPress={this.showPicker.bind(this)}>
                    <View>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <View style={styles.inputContainer}>
                            <Text style={styles.value}>{this.formatDate(this.state.value)}</Text>
                            <Text style={styles.fakeValue}/>
                        </View>
                    </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 15,
    },
    inputContainer:{
        flexDirection:'row',
        alignItems: 'baseline',
    },
    title:{
        fontWeight: 'bold',
        color: colors.blockTitle,
        paddingBottom: 10
    },
    value:{
        fontWeight: 'normal',
        marginBottom: 5,
        color: colors.blockContent,
    },
    fakeValue:{
        flex:1,
        borderColor: colors.inputUnderline,
        borderBottomWidth: 1,
        marginLeft: 5
    },
})
