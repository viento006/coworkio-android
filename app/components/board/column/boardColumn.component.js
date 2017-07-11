import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import Button from 'react-native-button';

import Task from '../../task/board/task.component'

import formControlStyles from '../../../styles/form-controls';


export default class BoardColumnComponent extends Component {
    render() {
        var { width } = Dimensions.get('window');

        return (
            <View style={[{ width: width * .8 }]}>
                <View style={[styles.container]}>

                <Text style={styles.projectSectionHeader}>
                    {this.props.title} ({this.props.tasks.length})
                </Text>
                { this.props.tasks.map((task, index)=>
                    <Task task={task} key={index} updateTask={this.props.updateTask} viewTask={this.props.viewTask}></Task>)
                }
                <Button containerStyle={[formControlStyles.buttonContainer, {marginBottom: 60}]} 
                        style={formControlStyles.buttonContent} onPress={this.props.createTask}>
                   Добавить задание
                </Button>
                </View>
            </View>
        );
    }
}

BoardColumnComponent.propTypes = {
    title: React.PropTypes.string,
    updateTask: React.PropTypes.func.isRequired,
    viewTask: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    projectSectionHeader: {
        fontSize: 25,
        marginLeft: 5,
        marginBottom: 10,
    },
})

AppRegistry.registerComponent('BoardColumnComponent', () => BoardColumnComponent)