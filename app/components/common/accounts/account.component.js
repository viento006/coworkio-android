import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import colors from '../../../styles/colors';
import { socialAccountTypes } from './enums';

export default class AccountComponent extends Component {
    render() {
        let { icon } = socialAccountTypes.find((account)=> account.value === this.props.data.type);
        return (
            <View style={styles.account}>
                <View style={styles.imageSection}>
                    <Image style={styles.image} source={icon}/>
                    <Text style={styles.text}>{this.props.data.link}</Text>
                </View>
                { this.props.onRemove &&
                    <TouchableOpacity onPress={() => this.props.onRemove(this.props.index)}>
                        <Text style={styles.accountCloseText}>x</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    account: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 5,
        borderColor: colors.border,
        borderWidth: .5,
        backgroundColor: colors.cardBackground,
    },
    text: {
        margin: 5,
    },
    imageSection:{
        flexDirection: 'row'
    },
    image: {
        width: 26,
        borderRadius: 23,
        height: 26,
        marginRight: 10
    },
    accountCloseText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginTop: -3,
        marginLeft: 5,
        marginRight: 5,
    }
})
