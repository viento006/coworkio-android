import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Text, View, TextInput, Picker, DatePickerAndroid, TouchableOpacity , ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

import { priorityTypes, taskLevels, taskTypes } from '../enums';
export default class EditTaskComponent extends Component {
    tmpTag = '';
    constructor(){
        super();
        this.state = {
            title: '',
            taskLevel: 0,
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

    showPicker = async (key) => {
        try {
            let newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open();
            if (action === DatePickerAndroid.dismissedAction) {
            } else {
                let date = new Date(year, month, day);
                newState[key] = date;
                this.setState(newState);
            }
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    formatDate(date){
        return date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : 'Выберите дату';
    }

    addTag(){
        this.setState({tags: [...this.state.tags, this.state.tmpTag], tmpTag: ''});
    }

    removeTag(index){
        let tags = this.state.tags.splice(index, 1);
        this.setState({tags});
    }

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
            <ScrollView containerStyle={styles.container}>
                <TextInput style={styles.inputs} onChangeText={(title)=> this.setState({title})}
                    autocorrect={false} placeholder='Название' value={this.state.title}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(description)=> this.setState({description})}
                    autocorrect={false} placeholder='Описание' value={this.state.description}>
                </TextInput>

                <View style={styles.picker}>
                    <Picker selectedValue={this.state.taskLevel}
                        onValueChange={(taskLevel) => this.setState({taskLevel})}>
                        {taskLevels.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                    </Picker>
                </View>
                
                <View style={styles.picker}>
                    <Picker selectedValue={this.state.taskType}
                        onValueChange={(taskType) => this.setState({taskType})}>
                        {taskTypes.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                    </Picker>
                </View>

                <TextInput style={styles.inputs} onChangeText={(estimate)=> { if(!isNaN(estimate)) this.setState({estimate})}}
                    keyboardType='numeric' autocorrect={false} placeholder='Оценка (в часах)' value={this.state.estimate}>
                </TextInput>

                <View style={styles.picker}>
                    <Picker selectedValue={this.state.priority}
                        onValueChange={(priority) => this.setState({priority})}>
                        {priorityTypes.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                    </Picker>
                </View>
                
                <View style={styles.tagList}>
                    {this.state.tags.map((tag, index) => 
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                            <TouchableOpacity style={styles.tagClose} onPress={() => this.removeTag.bind(this)(index)}>
                                <Text style={styles.tagCloseText}>x</Text>
                            </TouchableOpacity>
                        </View>
                    )}                   
                </View>

                 <View style={styles.addTagContainer}>
                    <TextInput style={[styles.inputs, styles.addTagInput]} onChangeText={(tmpTag)=> this.setState({tmpTag})}
                        autocorrect={false} placeholder='Введите тег' value={this.state.tmpTag}>
                    </TextInput>
                    <Button containerStyle={styles.addTagButton} style={styles.addTagButtonContent} onPress={this.addTag.bind(this)}>
                        +
                    </Button>
                </View>
                
                <TouchableOpacity style={styles.datepicker}
                    onPress={this.showPicker.bind(this, 'dueDate')}>
                    <View><Text style={styles.text}>Дата старта: {this.formatDate(this.state.dueDate)}</Text></View>
                </TouchableOpacity >

                <Button containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}} 
                    style={styles.submitButton} onPress={this.submit.bind(this)}>
                    {this.props.tasks.newTask.isLoading?
                        <ActivityIndicator  color="#fff" animating={this.props.tasks.newTask.isLoading} />: 
                        'Создать'
                    }
                </Button>
            </ScrollView>
        )
    }
}

EditTaskComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }, 
    register: {
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
    datepicker: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 0.7,
        borderColor: '#333333',
    },
    picker: {
        marginLeft: 25,
        marginRight: 25,
        borderBottomWidth: 0.7,
        borderColor: '#333333',
    },
    submitButton: {
        color:"#fff",
        fontWeight: 'bold'
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    tagList: {
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,
        marginBottom: -10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 13,
        backgroundColor: 'lightgray',
    },
    tagText: {
        marginRight: 10,
        marginLeft: 5
    },
    tagClose: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: 'red',
    },
    tagCloseText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addTagContainer:{
        flexDirection: 'row',
    },
    addTagInput: {
        flex:1
    },
    addTagButton:{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginTop: 15,
        marginRight: 15,
        backgroundColor: 'green'
    },
    addTagButtonContent:{
        color: 'white',
        fontSize: 20,
    }
})


AppRegistry.registerComponent('EditTaskComponent', () => EditTaskComponent)
