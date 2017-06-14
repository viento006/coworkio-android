import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import Button from 'react-native-button';

import { priorityTypes, taskLevels, taskTypes } from '../enums';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

import TagList from '../../common/tag/tagList.component';

import InfoCard from '../../common/infoCard/infoCard.component';
import InfoCardSection from '../../common/infoCard/infoCard-section.component';
import { Form } from '../../common/form-controls';


export default class ViewTaskComponent extends Component {
    componentWillMount(){
        this.props.getTask(this.props.navigation.state.params.task.id);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `${navigation.state.params.task.title}`,
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                       onPress={()=>{navigation.navigate('CreateTask', {isEdit: true, task: navigation.state.params.task, project: navigation.state.params.project})}}> ✎ </Button>
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

        var str = date.getFullYear() + "-" + month + "-" + day + " ";

        return str;
    }

    render() {
        const task = this.props.task.task || this.props.navigation.state.params.task;
        console.log('*******************************************************************')
        console.log('RENDER: VIEW TASK *************************************************')
        console.log('*******************************************************************')
        return (
            <Form>
                <InfoCard title='Общая информация'>
                    <InfoCardSection title='Название' value={task.title}></InfoCardSection>
                    <InfoCardSection title='Описание' value={task.description} isVisible={task.description}></InfoCardSection>
                </InfoCard>
                <InfoCard title='Автор'>
                    {task.authorId ? 
                        <View style={[styles.section, styles.imageSection]}>
                            <Image style={styles.image} source={task.authorId.photoUrl? { uri: task.authorId.photoUrl } : require('../../../images/placeholder.jpg')}/>
                            <Text style={styles.text}>{task.authorId.firstName}</Text>
                        </View>:
                        <Text style={styles.text}>Не назначен</Text>
                    }
                </InfoCard>
                <InfoCard title='Исполнитель'>
                    {task.assigneeId ? 
                        <View style={[styles.section, styles.imageSection]}>
                            <Image style={styles.image} source={task.assigneeId.photoUrl? { uri: task.assigneeId.photoUrl } : require('../../../images/placeholder.jpg')}/>
                            <Text style={styles.text}>{task.assigneeId.firstName}</Text>
                        </View>:
                        <Text style={styles.text}>Не назначен</Text>
                    }
                </InfoCard>
                <InfoCard>
                    <InfoCardSection title='Тип задачи' value={taskTypes.find(t => t.value == task.taskType).label} isVisible={task.taskType}></InfoCardSection>
                    <InfoCardSection title='Приоритет' value={priorityTypes.find(p => p.value == task.priority).label} isVisible={task.priority}></InfoCardSection>
                    <InfoCardSection title='Оценка' value={task.estimate + ' часов'} isVisible={task.estimate}></InfoCardSection>
                    <InfoCardSection title='Срок выполенения' value={this.getFormattedDate(task.dueDate)} isVisible={task.dueDate}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Теги' isVisible={task.tags && !!task.tags.length}>
                    <TagList items={task.tags}/>
                </InfoCard>
            </Form>
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
    imageSection:{
        flexDirection: 'row'
    },
    image: {
        width: 30,
        borderRadius: 15,
        height: 30,
        marginRight: 10
    },
    text: {
        marginRight: 5,
        marginLeft: 5
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
