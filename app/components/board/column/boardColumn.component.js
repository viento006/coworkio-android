import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import Button from 'react-native-button';

export default class BoardColumnComponent extends Component {
    componentWillReceiveProps(nextProps){
        
    }

    render() {
        var { width } = Dimensions.get('window');

        return (
            <View style={[styles.container ,{ width: width * .8 }]}>
                <Text style={styles.projectSectionHeader}>
                    {this.props.title}
                </Text> 
            </View>
        );
    }
}

BoardColumnComponent.propTypes = {
    title: React.PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }, 
    login: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 30
    }, 
    inputs: {
        color: '#333333',
        marginLeft: 20,
        marginRight: 20
    },
    submitButton: {
        color:"#fff",
    }, 
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
})


AppRegistry.registerComponent('BoardColumnComponent', () => BoardColumnComponent)