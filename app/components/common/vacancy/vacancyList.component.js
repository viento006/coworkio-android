import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import Button from 'react-native-button';
import Vacancy from './vacancy.component';

export default class VacancyListComponent extends Component {
    removeItem(index){
        this.props.items.splice(index, 1);
        this.props.onItemsChange(this.props.items);
    }

    render() {
        return (
             <View style={styles.vacancyList}>
                {this.props.items.map((item, index) => 
                    <Vacancy key={index} index={index} item={item} onRemove={this.props.onItemsChange ? this.removeItem.bind(this) : undefined}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    vacancyList: {
    },
})
