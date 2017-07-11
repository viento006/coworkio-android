import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import InfoCard from '../../common/infoCard/infoCard.component';
import InfoCardSection from '../../common/infoCard/infoCard-section.component';
import { socialAccountTypes } from '../../common/accounts/enums';
import TagList from '../../common/tag/tagList.component';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';


export default class ViewProfileComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Ваш профиль`,
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                       onPress={()=>{navigation.navigate('EditProfile', { profile: navigation.state.params.profile})}}> ✎ </Button>
    });

    componentDidMount(){
        this.props.getProfile(this.props.navigation.state.params.profile.id);
    }

    openUrl(url){
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    render() {
        const { profile } = this.props.profile;

        return (
            <ScrollView style={styles.container}>
                <View style={[styles.section, styles.imageSection]}>
                    <Image style={styles.image} source={profile.photoUrl ? { uri: profile.photoUrl } : require('../../../images/placeholder.jpg')}/>
                    <Text style={styles.name}>
                       {profile.lastName} {profile.firstName} {profile.middleName}
                    </Text>
                </View>

                <InfoCard isVisible={profile.email || profile.phoneNumber} title='Контактная информация'>
                    <InfoCardSection title='Email' value={profile.email} isVisible={profile.email}></InfoCardSection>
                    <InfoCardSection title='📞' value={profile.phoneNumber} isVisible={profile.phoneNumber}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Навыки'>
                    <TagList items={profile.skills.map(skill => skill.skillId)} />
                </InfoCard>

                <InfoCard title='Проекты'>
                    <InfoCardSection title='Активных' value={profile.projects.filter((p) => p.current).length} isVisible={profile.projects}></InfoCardSection>
                    <InfoCardSection title='Завершенных' value={profile.projects.filter((p) => !p.current).length} isVisible={profile.projects}></InfoCardSection>
                </InfoCard>

                <InfoCard title='Аккаунты' isVisible={(profile.github || (profile.accounts && profile.accounts.length))}>
                    <TouchableOpacity onPress={this.openUrl.bind(this,[profile.github])}>
                        <InfoCardSection icon={require('../../../images/icons/github.png')} value={profile.github} isVisible={profile.github}></InfoCardSection>
                    </TouchableOpacity>
                    {profile.accounts.map((item, index)=> {
                        const { icon } = socialAccountTypes.find((account)=> account.value === item.type);
                        return <InfoCardSection key={index} icon={icon} value={item.link}></InfoCardSection>
                    })}
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
        padding: 15,
        marginBottom:15
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
        marginRight: 10,
    }, 
    name:{
        fontSize: 18,
        color: colors.darkFontColor,
        padding: 3,
        flexWrap: 'wrap',
        flex: 1
    },
})

AppRegistry.registerComponent('ViewProfileComponent', () => ViewProfileComponent)
