import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import colors from '../../../styles/colors';

import Button from 'react-native-button';
import Tag from './tag.component';


export default class TagListComponent extends Component {
    removeTag(index){
        this.props.items.splice(index, 1);
        this.props.onItemsChange(this.props.items);
    }

    render() {
        return (
             <View style={styles.tagList}>
                {this.props.items && this.props.items.map((tag, index) => 
                    <Tag key={index} index={index} title={tag} onRemove={this.props.onItemsChange ? this.removeTag.bind(this) : undefined}/>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
})
