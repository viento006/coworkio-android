import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, ScrollView } from 'react-native';

import colors from '../../../styles/colors';

export default class FormComponent extends Component {
    render() {
        return (
            <ScrollView>
                <View style={[styles.container, this.props.style]}>
                    {this.props.children}
                 </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.defaultBackground,
        padding: 20,
    }
})
