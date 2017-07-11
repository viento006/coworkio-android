import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';

import colors from '../../styles/colors';


export default class TaskComponent extends Component {
    statusColors = {
        LOW: '#3BFF00',
        MINOR: '#7FFFFF',
        NORMAL: '#FFE97F',
        MAJOR: '#FF7F7F',
        BLOCKER: '#FF0000',
    }

    moveTask(status){
        this.props.updateTask({...this.props.task, status})
    }

    render() {
        const { task } = this.props;
 
        return (
            <TouchableOpacity onPress={() => this.props.viewTask(task)}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={[styles.statusLabel, {backgroundColor: this.statusColors[task.priority]}]}></View>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
                                {task.title}
                        </Text>
                    </View>
                    <View style={styles.picker}>
                        <Picker prompt='Переместить в...' selectedValue={task.status} onValueChange={(status) => this.moveTask(status)}>
                            {task.availableStatuses.map((item, index) => 
                                <Picker.Item key={index} color={task.status === item.order ? colors.defaultFontColor : colors.darkFontColor} label={'⋮ '+ item.title} value={item.order} />)
                            }
                        </Picker>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 50,
        margin: 5,
        borderWidth: .5,
        borderColor: 'gray',
        justifyContent: 'space-between',
    },
    statusLabel: {
        width: 10,
    },
    content: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        margin: 10,
    },
    picker: {
        width: 50
    },
})


AppRegistry.registerComponent('TaskComponent', () => TaskComponent)
