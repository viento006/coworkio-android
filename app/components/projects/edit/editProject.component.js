import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator, Picker } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

import InfoCard from '../../common/infoCard/infoCard.component';

import { Form, Input, Datepicker, VacancyInput, SubmitButton } from '../../common/form-controls';

export default class EditProjectComponent extends Component {
    users = [];
    isSubmitted = false;

    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            positions: [],
            githubLink:'',
        };
    }

    componentWillMount(){
        this.props.getUsers();
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.projects.newProject.isLoading && !nextProps.projects.error && nextProps.projects.newProject.projectID && this.isSubmitted ){
            this.props.navigation.navigate('Dashboard');
            this.isSubmitted = false;
        }
        this.users = [{label: 'Не назначен', value: {}}, ...nextProps.users.profiles.map(profile => { 
            return {
                label: profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}` : profile.email,
                value: profile
            }
        })];
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params 
            ? (navigation.state.params.isEdit ? 'Редактировать': 'Создать' ) +' проект'
            : ''
    });

    selectOptions= [{label:'Hello', value: '1'}, {label:'Value', value: '2'}];

    submit(){
        //validate
        this.props.onSubmit(this.state);
        this.isSubmitted = true;
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT PROJECT *************************************************')
        console.log('*******************************************************************')
        return (
            <Form>
                <InfoCard>
                    <Input title='Название' value={this.state.title} onChangeText={title => this.setState({ title })}/>
                </InfoCard>

                <InfoCard>
                    <Input title='Описание' multiline={true} value={this.state.description} onChangeText={description => this.setState({ description })}/>
                </InfoCard>

                <InfoCard>
                    <Input title='Ссылка на репозиторий' value={this.state.githubLink} onChangeText={githubLink => this.setState({ githubLink })}/>                    
                </InfoCard>

                <InfoCard>
                    <Datepicker title='Дата старта' value={this.state.startDate} onChange={(startDate)=> this.setState({startDate})}/>
                    <Datepicker title='Дата окончания' value={this.state.endDate} onChange={(endDate)=> this.setState({endDate})}/>
                </InfoCard>

                <InfoCard>
                    <VacancyInput title='Позиции на проекте' users={this.users} items={this.state.positions} onItemsChange={(positions)=> this.setState({positions})}/>
                </InfoCard>

                <SubmitButton isLoading={this.props.projects.newProject.isLoading} title='Создать' onPress={this.submit.bind(this)}/>
            </Form>
        )
    }
}

EditProjectComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

AppRegistry.registerComponent('EditProjectComponent', () => EditProjectComponent)
