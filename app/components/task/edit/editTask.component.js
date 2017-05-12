import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Button from 'react-native-button';

import { priorityTypes, taskTypes } from '../enums';

import colors from '../../../styles/colors';

import { Form, Input, Datepicker, TagInput, Picker, SubmitButton } from '../../common/form-controls';

export default class EditTaskComponent extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            taskType: 0,
            //subtasks: '',
            //parentTask: '',
            //relatedTasks: '',
            description: '',
            //authorId: '',
            //assigneeId: '',
            estimate: '',
            priority: 0,
            tags: [],
            tmpTag: '',
            //status: '',
            sprintId: '',
            projectId : '',
            dueDate: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.tasks.newTask.isLoading && !nextProps.tasks.newTask.error ){
            this.props.navigation.goBack()
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params 
            ? (navigation.state.params.isEdit ? 'Редактировать': 'Создать' ) +' задачу' 
            : ''
    });

    submit(){
        //validate
        let { sprintId, projectId, status } = this.props.navigation.state.params

        let data = {...this.state, sprintId, projectId, status}
        delete data.tmpTag;
        this.props.onSubmit(data);
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT TASK *************************************************')
        console.log('*******************************************************************')
        return (
            <Form>
                <Input title='Название' value={this.state.title} onChangeText={title => this.setState({ title })}/>

                <Input title='Описание' multiline={true} value={this.state.description} onChangeText={description => this.setState({ description })}/>

                <Picker items={taskTypes} value={this.state.taskType} title="Тип задачи" onValueChange={(taskType) => this.setState({taskType})}/>
                
                <Input title='Оценка (в часах)' keyboardType='numeric' value={this.state.estimate} onChangeText={estimate => this.setState({ estimate })}/>

                <Picker items={priorityTypes} value={this.state.priority} title="Приоритет" onValueChange={(priority) => this.setState({priority})}/>

                <TagInput title='Теги' hint='Введите тег' items={this.state.tags} onItemsChange={(tags)=> this.setState({tags})}/>

                <Datepicker title='Выполнить до' value={this.state.dueDate} onChange={(dueDate)=> this.setState({dueDate})}/>

                <SubmitButton isLoading={this.props.tasks.newTask.isLoading} title='Создать' onPress={this.submit.bind(this)}/>
            </Form>
        )
    }
}

EditTaskComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}



AppRegistry.registerComponent('EditTaskComponent', () => EditTaskComponent)
