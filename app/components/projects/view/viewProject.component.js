import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import InfoCard from '../../common/infoCard/infoCard.component';
import { Input, SubmitButton } from '../../common/form-controls';
import InfoCardSection from '../../common/infoCard/infoCard-section.component';
import VacancyList from '../../common/vacancy/vacancyList.component';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class ViewProjectComponent extends Component {
    
    constructor(){
        super();
        this.state = {deleteName: ''};
    }

    componentWillMount(){
        this.props.getProject(this.props.navigation.state.params.project.id);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.project.title,
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                       onPress={()=>{navigation.navigate('EditProject', { project: navigation.state.params.project})}}> ✎ </Button>
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
        const project  = this.props.project.project || this.props.navigation.state.params.project || {positions:[]};
        console.log('*******************************************************************')
        console.log('RENDER: VIEW PROJECT *************************************************')
        console.log('*******************************************************************')
        
        return (
            <ScrollView style={styles.container}>
                <InfoCard title='Информация о проекте'>
                    <InfoCardSection title='Название' value={project.title} />
                    <InfoCardSection title='Описание' value={project.description} isVisible={project.description}/>
                    <InfoCardSection title='Дата старта' value={this.getFormattedDate(project.startDate)} isVisible={project.startDate}/>
                    <InfoCardSection title='Дата окончания' value={this.getFormattedDate(project.endDate)} isVisible={project.endDate}/>
                    <InfoCardSection title='Ссылка на репозиторий' value={project.githubLink} isVisible={project.githubLink}/>
                    <InfoCardSection title='Количество спринтов' value={project.sprints.length} isVisible={project.sprints}/>
               
                    <SubmitButton title='Открыть доску заданий' onPress={() => this.props.navigation.navigate('Board', { project })} />
                </InfoCard>

                <InfoCard title='Позиции' isVisible={project.positions && !!project.positions.length}>
                    <VacancyList items={project.positions}/>
                </InfoCard>

                <InfoCard title='Удалить проект'>
                    <Input title='Для удаления проекта введите его название' value={this.state.deleteName} onChangeText={deleteName => this.setState({ deleteName })}/>
                    <SubmitButton disabled={this.state.deleteName !== project.title} title='Удалить проект' isSubmit={false} />
                </InfoCard>
            </ScrollView>
        )
    }
}

ViewProjectComponent.propTypes = {
    getProject: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBackground,
        padding: 15
    },
    imageSection: {
        backgroundColor: colors.cardBackground,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 100,
        borderRadius: 50,
        height: 100,
        marginRight: 10
    }, 
    name:{
        fontSize: 18,
        color: colors.darkFontColor,
        padding: 3
    },
})


AppRegistry.registerComponent('ViewProjectComponent', () => ViewProjectComponent)
