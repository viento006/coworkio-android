import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Picker, DatePickerAndroid, TouchableOpacity , ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

import { priorityTypes, taskLevels, taskTypes } from '../enums';

export default class ViewTaskComponent extends Component {
    
    constructor(){
        super();
    }

    componentWillMount(){
        this.props.getTask(this.props.navigation.state.params.task.id);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `${navigation.state.params.task.title}`,
        headerRight: <Button containerStyle={styles.addProjectButton} style={styles.addProjectButtonContent}
                       onPress={()=>{navigation.navigate('CreateTask', {isEdit: true, task: navigation.state.params.task})}}> ✎ </Button>
    });

    getFormattedDate(timestamp) {
        var date = new Date(timestamp);

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;

        var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min;

        return str;
    }

    render() {
        const task = this.props.task.task || this.props.navigation.state.params.task;
        console.log('*******************************************************************')
        console.log('RENDER: VIEW TASK *************************************************')
        console.log('*******************************************************************')
        return (            
            <View style={styles.container}>
                { task.tags && task.tags.length ? <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Теги:
                    </Text>
                    <Text style={styles.value}>
                        {task.description}
                    </Text>
                </View>: <View></View>
                }
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Описание
                    </Text>
                    <Text style={styles.value}>
                        {task.description}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Уровень задачи
                    </Text>
                    <Text style={styles.value}>
                        {taskLevels.find(l => l.strValue == task.taskLevel).label}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Тип задачи
                    </Text>
                    <Text style={styles.value}>
                        {taskTypes.find(t => t.strValue == task.taskType).label}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Оценка
                    </Text>
                    <Text style={styles.value}>
                        {task.estimate} часов
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Приоритет
                    </Text>
                    <Text style={styles.value}>
                        {priorityTypes.find(p => p.strValue == task.priority).label}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Готово к дате
                    </Text>
                    <Text style={styles.value}>
                        {this.getFormattedDate(task.dueDate)}
                    </Text>
                </View>
            </View>
        )
    }
}

ViewTaskComponent.propTypes = {
    getTask: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    section: {
        margin: 10
    },
    sectionName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    editTaskButton:{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    editTaskButtonContent:{
        color: 'green',
        fontSize: 20,
    }
})


AppRegistry.registerComponent('ViewTaskComponent', () => ViewTaskComponent)
