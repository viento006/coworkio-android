import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView } from 'react-native';
import Button from 'react-native-button';

import InfoCard from '../../common/infoCard/infoCard.component';
import { Input, SubmitButton } from '../../common/form-controls';
import InfoCardSection from '../../common/infoCard/infoCard-section.component';
import VacancyList from '../../common/vacancy/vacancyList.component';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';


export default class ViewProjectComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params.project.title,
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                       onPress={()=>{navigation.navigate('EditProject', { project: navigation.state.params.project})}}> ✎ </Button>
    });

    constructor(){
        super();
        this.state = { deleteName: '' };
    }

    componentDidMount(){
        this.props.getProject(this.props.navigation.state.params.project.id);
    }

    getFormattedDate(timestamp) {
        let date = new Date(timestamp);

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;

        let str = date.getFullYear() + "-" + month + "-" + day + " ";

        return str;
    }

    render() {
        const project  = this.props.project.project || this.props.navigation.state.params.project || { positions:[] };
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
    }
})

AppRegistry.registerComponent('ViewProjectComponent', () => ViewProjectComponent)
