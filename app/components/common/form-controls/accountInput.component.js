import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import { socialAccountTypes } from '../accounts/enums';

import Button from './submitButton.component';
import Input from './input.component';
import Picker from './picker.component';
import AccountList from '../accounts/accountList.component';


export default class AccountInputComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            items: props.items || [],
            link: '',
            type: socialAccountTypes[0].value,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({items: nextProps.items});
    }

    addAccount(){
        let newAccount = {
            link: this.state.link,
            type: this.state.type,
        };

        let items = [...this.state.items, newAccount];

        this.setState({
            link: '',
            type: socialAccountTypes[0].value,
        });

        this.props.onItemsChange(items);
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.title}>{this.props.title}</Text>

                <AccountList items={this.state.items} onItemsChange={this.props.onItemsChange}/>

                 <View style={styles.addTagContainer}>
                    <Input title='Ссылка' value={this.state.link} onChangeText={link => this.setState({ link })}/>

                    <Picker items={socialAccountTypes} value={this.state.type} title="Приложение" onValueChange={(type) => this.setState({type})}/>
                    
                    <Button disabled={!this.state.link} onPress={this.addAccount.bind(this)} title='Добавить' isSubmit={false}/>
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
    title:{
        fontWeight: 'bold',
        color: colors.blockTitle,
        fontSize: 16,
        marginBottom: 15
    },
    value:{
        color: colors.blockContent,
    },
    addTagContainer:{
    },
    addTagInput: {
        flex: 1,
        marginLeft: 5
    },
    addTagButton:{
        height: 40,
        width: 40,
        marginRight: 15,
    },
    addTagButtonContent:{
        color: colors.submitButtonBackground,
        fontSize: 30,
        fontWeight: '100',
        textAlignVertical: 'top'
    }
})
