import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import colors from '../../../styles/colors';
export default class InfoCardComponent extends Component {
    render() {
        if(this.props.isVisible || this.props.isVisible === undefined){
            return (
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        {this.props.title}
                    </Text>
                    {this.props.children}
                </View>
            )
        }else{
            return <View></View>
        }
    }
}


const styles = StyleSheet.create({
    section: {
        margin:10,
        backgroundColor: colors.cardBackground,
        padding: 10,
    },
    sectionName: {
        fontSize: 20,
        fontWeight: '500',
        color: colors.defaultFontColor,
        margin: 5,
        marginBottom: 15
    }
})
