import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import { positions } from './enums';
import InfoCardSection from '../infoCard/infoCard-section.component';

export default class VacancyComponent extends Component {
    render() {
        let vacancy = this.props.item;
        let mappedType = positions.find((p) => p.value === vacancy.type)
        vacancy.typeLabel = mappedType? mappedType.label: vacancy.type;
        vacancy.employeeName = vacancy.employee 
            ? vacancy.employee.firstName || vacancy.employee.lastName 
                ? vacancy.employee.firstName+' '+ vacancy.employee.lastName
                : vacancy.employee.employeeId 
            :'';
        return (
            <View style={styles.vacancy}>
                <View style={styles.container}>
                    <InfoCardSection title='Название' value={vacancy.title || vacancy.positionInfo && vacancy.positionInfo.title} />
                    <InfoCardSection title='Описание' value={vacancy.description || vacancy.positionInfo && vacancy.positionInfo.description} />
                    <InfoCardSection title='Навык' value={vacancy.typeLabel || vacancy.positionInfo && vacancy.positionInfo.typeLabel} />
                        
                    <Text style={styles.property}>Исполнитель:</Text>
                    {vacancy.employee? 
                        <View style={[styles.section, styles.imageSection]}>
                            <Image style={styles.image} source={vacancy.employee.photoUrl? { uri: vacancy.employee.photoUrl } : require('../../../images/placeholder.jpg')}/>
                            <Text style={styles.text}>{vacancy.employeeName}</Text>
                        </View>:
                        <Text style={styles.text}>Не назначен</Text>
                    }
                </View>
                { this.props.onRemove &&
                    <TouchableOpacity onPress={() => this.props.onRemove(this.props.index)}>
                        <Text style={styles.closeText}>x</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    vacancy: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 5,
        borderColor: colors.border,
        borderWidth: .5,
        backgroundColor: colors.cardBackground,
        alignItems: 'flex-start'
    },
    container:{
        flex: 1
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
    property: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.darkFontColor,
        marginLeft: 5,
        marginRight: 5,
    },
    text: {
        marginRight: 5,
        marginLeft: 5
    },
    closeText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginTop: -3,
        marginLeft: 5,
        marginRight: 5,
    },
})
