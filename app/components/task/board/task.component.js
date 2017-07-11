import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Picker } from 'react-native';

import colors from '../../../styles/colors';

import TagList from '../../common/tag/tagList.component';


export default class TaskComponent extends Component {
    statusColors = {
        LOW: '#aaffcc',
        MINOR: '#eeffaa',
        NORMAL: '#ffeeaa',
        MAJOR: '#ffccaa',
        BLOCKER: '#de8787',
    }

    moveTask(status){
        this.props.updateTask({...this.props.task, status})
    }

    render() {
        const { task } = this.props;
 
        return (
            <TouchableOpacity onPress={() => this.props.viewTask(task)}>
                <View style={styles.container}>
                    <View style={[styles.statusLabel, {backgroundColor: this.statusColors[task.priority]}]}></View>
                    <View style={styles.contentWrapper}>
                        <View style={styles.content}>
                            <View>
                                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>
                                    {task.title}
                                </Text>
                            </View>
                            <View style={styles.picker}>
                                <Picker prompt='Переместить в...' onValueChange={(status) => this.moveTask(status)}>
                                    {task.availableStatuses.map((item, index) => 
                                        <Picker.Item key={index} label={'⋮ '+ item.title} value={item.order} />)
                                    }
                                </Picker>
                            </View>
                        </View>
                        {!!task.tags && !!task.tags.length &&
                            <TagList items={task.tags}/>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.cardBackground,
        minHeight: 50,
        margin: 5,
        elevation: 1
    },
    statusLabel: {
        width: 10,
    },
    contentWrapper: {
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 5
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: -10
    },
    title: {
        fontSize: 20,
        margin: 10,
    },
    picker: {
        width: 50
    }
})

AppRegistry.registerComponent('TaskComponent', () => TaskComponent)
