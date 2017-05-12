import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

export default class TagComponent extends Component {
    render() {
        return (
            <View style={styles.tag}>
                <Text style={styles.tagText}>{ this.props.title }</Text>
                { this.props.onRemove &&
                    <TouchableOpacity onPress={() => this.props.onRemove(this.props.index)}>
                        <Text style={styles.tagCloseText}>x</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
        marginRight: 5,
        borderRadius: 5,
        borderColor: colors.border,
        borderWidth: .5,
        backgroundColor: colors.cardBackground,
        height: 24
    },
    tagText: {
        marginRight: 5,
        marginLeft: 5
    },
    tagCloseText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginTop: -3,
        marginLeft: 5,
        marginRight: 5,
    },
})
