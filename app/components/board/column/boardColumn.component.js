import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import Button from 'react-native-button';

import Task from '../../task/board/task.component'

export default class BoardColumnComponent extends Component {
    componentWillReceiveProps(nextProps){
        
    }

    render() {
        var { width } = Dimensions.get('window');

        return (
            <View style={[styles.container ,{ width: width * .8 }]}>
                <Text style={styles.projectSectionHeader}>
                    {this.props.title}
                </Text>
                { this.props.tasks.map((task, index)=>
                    <Task task={task} key={index} updateTask={this.props.updateTask} viewTask={this.props.viewTask}></Task>)
                }
                <Button style={styles.submitButtonContent}
                    containerStyle={styles.submitButton} onPress={this.props.createTask}>
                   Добавить задание
                </Button>
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
        backgroundColor: '#F5FCFF',
        borderLeftWidth: 1,
        padding: 10
    },
    
    projectSectionHeader: {
        fontSize: 25
    }, 
    login: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 30
    }, 
    inputs: {
        color: '#333333',
        marginLeft: 20,
        marginRight: 20
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
     submitButton: {
        padding:10,
        margin: 25,
        height: 50,
        overflow:'hidden',
        borderRadius:4,
        borderColor: 'gray',
        borderWidth: 1,
        borderStyle: 'dashed'
    }, 
    submitButtonContent: {
        color:"#000",
    },
})


AppRegistry.registerComponent('BoardColumnComponent', () => BoardColumnComponent)