import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import { positions } from '../vacancy/enums';

import Button from './submitButton.component';
import Input from './input.component';
import Picker from './picker.component';
import VacancyList from '../vacancy/vacancyList.component';

export default class TagInputComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            items: props.items || [],
            title: '',
            description: '',
            type: '',
            employeeId: '',
            employee: {}
        };
    }
    componentWillReceiveProps(nextProps){
        this.setState({items: nextProps.items});
    }
//TODO: map existimg positions to users by id
    addPosition(){
        let newPosition = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            employeeId: this.state.employee.id,
            employee: this.state.employee
        };

        let items = [...this.state.items, newPosition];

        this.setState({
            title: '',
            description: '',
            type: '',
            employeeId: '',
            employee: {}
        });

        this.props.onItemsChange(items);
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.title}>{this.props.title}</Text>

                <VacancyList items={this.state.items} onItemsChange={this.props.onItemsChange}/>

                 <View style={styles.addTagContainer}>
                    <Input title='Название' value={this.state.title} onChangeText={title => this.setState({ title })}/>
                    <Input title='Описание' multiline={true} value={this.state.description} onChangeText={description => this.setState({ description })}/>

                    <Picker items={positions} value={this.state.type} title="Навык" onValueChange={(type) => this.setState({type})}/>
                    <Picker items={this.props.users} value={this.state.employee} title="" onValueChange={(employee) => this.setState({employee})}/>

                    
                    <Button onPress={this.addPosition.bind(this)} title='Добавить' isSubmit={false}>
                    </Button>
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
