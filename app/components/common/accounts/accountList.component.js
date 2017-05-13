import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import Button from 'react-native-button';
import Account from './account.component';
export default class AccountListComponent extends Component {
    removeItem(index){
        this.props.items.splice(index, 1);
        this.props.onItemsChange(this.props.items);
    }

    render() {
        return (
             <View style={styles.list}>
                {this.props.items.map((item, index) => 
                    <Account key={index} index={index} data={item} onRemove={this.props.onItemsChange ? this.removeItem.bind(this) : undefined}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})
