import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import colors from '../../../styles/colors';

import Button from 'react-native-button';
import Input from './input.component';
import TagList from '../tag/tagList.component';


export default class TagInputComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isError: false,
            items: props.items || [],
            value: ''
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({items: nextProps.items});
    }

    addTag(){
        let items = [...this.state.items, this.state.value];
        this.setState({value: ''});
        this.props.onItemsChange(items);
    }

    removeTag(index){
        let items = this.state.items.splice(index, 1);
        this.props.onItemsChange(items);
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Text style={styles.title}>{this.props.title}</Text>

                <TagList items={this.state.items} onItemsChange={this.props.onItemsChange}/>

                 <View style={styles.addTagContainer}>
                    <Text style={styles.value}>{this.props.hint}</Text>
                    <Input style={styles.addTagInput} onChangeText={(value)=> this.setState({ value })} value={this.state.value} />
                    
                    <Button containerStyle={styles.addTagButton} style={styles.addTagButtonContent} onPress={this.addTag.bind(this)}>
                        +
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        marginTop: 5,
        marginBottom: 5,
    },
    title:{
        fontWeight: 'bold',
        color: colors.blockTitle,
    },
    value:{
        color: colors.blockContent,
    },
    addTagContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTagInput: {
        flex: 1,
        marginLeft: 5
    },
    addTagButton:{
        height: 40,
        width: 40,
        marginRight: 15,
    },
    addTagButtonContent:{
        color: colors.submitButtonBackground,
        fontSize: 30,
        fontWeight: '100',
        textAlignVertical: 'top'
    }
})
