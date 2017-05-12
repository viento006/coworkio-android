import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Button from 'react-native-button';

import InfoCard from '../../common/infoCard/infoCard.component';
import InfoCardSection from '../../common/infoCard/infoCard-section.component';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class ViewProfileComponent extends Component {
    
    constructor(){
        super();
    }

    componentWillMount(){
        this.props.getProfile(this.props.navigation.state.params.profile.id);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Ваш профиль`,
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                       onPress={()=>{navigation.navigate('EditProfile', { profile: navigation.state.params.profile})}}> ✎ </Button>
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
        const { profile } = this.props.profile;
        console.log('*******************************************************************')
        console.log('RENDER: VIEW PROFILE *************************************************')
        console.log('*******************************************************************')
        
        return (
            <ScrollView style={styles.container}>
                <View style={[styles.section, styles.imageSection]}>
                    <Image style={styles.image} source={profile.photoUrl? { uri: profile.photoUrl } : require('../../../images/placeholder.jpg')}/>
                    <Text style={styles.name}>
                       {profile.lastName} 
                    </Text>
                    <Text style={styles.name}>
                        {profile.firstName} 
                    </Text> 
                    <Text style={styles.name}>
                        {profile.middleName}
                    </Text>
                </View>

                <InfoCard isVisible={profile.email || profile.phoneNumber} title='Контактная информация'>
                    <InfoCardSection title='Email' value={profile.email} isVisible={profile.email}></InfoCardSection>
                    <InfoCardSection title='📞' value={profile.phoneNumber} isVisible={profile.phoneNumber}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Проекты'>
                    <InfoCardSection title='Активных' value={profile.projects.filter((p) => p.current).length} isVisible={profile.projects}></InfoCardSection>
                    <InfoCardSection title='Завершенных' value={profile.projects.filter((p) => !p.current).length} isVisible={profile.projects}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Аккаунты' isVisible={(profile.github || (profile.accounts && profile.accounts.length))}>
                    <InfoCardSection title='GitHub' value={profile.github} isVisible={profile.github}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Информация о университете' isVisible={profile.university}>
                    <InfoCardSection title='Университет' value={profile.university.university} isVisible={profile.university.university}></InfoCardSection>
                    <InfoCardSection title='Факультет' value={profile.university.faculty} isVisible={profile.university.faculty}></InfoCardSection>
                    <InfoCardSection title='Специальность' value={profile.university.department} isVisible={profile.university.department}></InfoCardSection>
                    <InfoCardSection title='Номер группы' value={profile.university.group} isVisible={profile.university.group}></InfoCardSection>
                    <InfoCardSection title='Срок обучения' value={(profile.university.startYear || '...') + ' - ' + (profile.university.endYear || '...')}
                        isVisible={profile.university.startYear || profile.university.endYear}></InfoCardSection>
                </InfoCard>
            </ScrollView>
        )
    }
}

ViewProfileComponent.propTypes = {
    getProfile: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBackground,
        padding: 15
    },
    imageSection: {
        margin: 10,
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


AppRegistry.registerComponent('ViewProfileComponent', () => ViewProfileComponent)
