import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Button from 'react-native-button';

import { priorityTypes, taskTypes } from '../enums';

import colors from '../../../styles/colors';

import { Form, Input, Datepicker, TagInput, Picker, SubmitButton } from '../../common/form-controls';
import InfoCard from '../../common/infoCard/infoCard.component';

export default class EditTaskComponent extends Component {
    isSubmitted = false;
    constructor(props){
        super(props);
        const task = props.navigation.state.params.task || {};
        this.state = {
            id: task.id,
            title: task.title || '',
            taskType: task.taskType || 0,
            //subtasks: '',
            //parentTask: '',
            //relatedTasks: '',
            description: task.description || '',
            assigneeId: task.assigneeId ? task.assigneeId.id : '',
            estimate: task.estimate || '',
            priority: task.priority || 0,
            tags: task.tags || [],
            status: task.status || props.navigation.state.params.status || '1',
            sprintId: task.sprintId || props.navigation.state.params.sprintId ||'0',
            projectId: task.projectId || this.props.navigation.state.params.project.id || '',
            dueDate: task.dueDate ? new Date(task.dueDate) : '',
        };
    }

    componentWillMount(){
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps){
        if (((!nextProps.tasks.newTask.loading && !nextProps.tasks.newTask.error && nextProps.tasks.newTask.task) ||
            (!nextProps.tasks.updatedTask.loading && !nextProps.tasks.updatedTask.error && nextProps.tasks.updatedTask.task)) &&
             this.isSubmitted){
            this.props.navigation.navigate('Board', { project: nextProps.navigation.state.params.project });
            this.isSubmitted = false;
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params 
            ? (navigation.state.params.isEdit ? 'Редактировать': 'Создать' ) +' задачу' 
            : ''
    });

    submit(){
        //validate
        let data = { ...this.state};
        let isEdit = this.props.navigation.state.params.isEdit;
        this.props.onSubmit(data, isEdit);
        this.isSubmitted = true;
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT TASK *************************************************')
        console.log('*******************************************************************')
        const project = this.props.navigation.state.params.project;
        const users = [{label: 'Не назначено', value: ''},
            ...(project.positions ? project.positions.map(position =>{
                return {
                    label: position.positionInfo.title,
                    value: position.employeeId
                }
            }): [])
        ];
        return (
            <Form>
                <InfoCard>
                    <Input title='Название' value={this.state.title} onChangeText={title => this.setState({ title })}/>
                    <Input title='Описание' multiline={true} value={this.state.description} onChangeText={description => this.setState({ description })}/>
                </InfoCard>

                <InfoCard>
                    <Picker items={taskTypes} value={this.state.taskType} title="Тип задачи" onValueChange={(taskType) => this.setState({taskType})}/>
                    <Picker items={priorityTypes} value={this.state.priority} title="Приоритет" onValueChange={(priority) => this.setState({priority})}/>
                </InfoCard>

                <InfoCard>
                    <Input title='Оценка (в часах)' keyboardType='numeric' value={this.state.estimate} onChangeText={estimate => this.setState({ estimate })}/>
                    <Datepicker title='Выполнить до' value={this.state.dueDate} onChange={(dueDate)=> this.setState({dueDate})}/>
                </InfoCard>

                <InfoCard>
                    <TagInput title='Теги' hint='Введите тег' items={this.state.tags} onItemsChange={(tags)=> this.setState({tags})}/>
                </InfoCard>

                <InfoCard>
                    <Picker title='Исполнитель' items={users} value={this.state.assigneeId} onValueChange={(assigneeId)=> this.setState({assigneeId})}/>
                </InfoCard>

                <SubmitButton isLoading={this.props.tasks.newTask.isLoading} title='Создать' onPress={this.submit.bind(this)}/>
            </Form>
        )
    }
}

EditTaskComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}



AppRegistry.registerComponent('EditTaskComponent', () => EditTaskComponent)
