import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

export default class ProjectCardComponent extends Component {
    constructor(props){
        super(props)
    }

//TODO: add conditional styling based on the current field
    render() {
        const { project } = this.props.project; 
        return (
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>
                        {project.title}
                    </Text>
                    <Text style={styles.description}>
                        {project.description}
                    </Text>
                </View>
                <Button style={styles.submitButtonContent}
                    containerStyle={styles.submitButton} onPress={this.props.openBoard}>
                    Открыть доску заданий
                </Button>
            </View>
        );
    }
}

ProjectCardComponent.propTypes = {
    openBoard: React.PropTypes.func.isRequired,
    project: React.PropTypes.any.isRequired
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        borderRadius: 3,
        backgroundColor: '#FCFCFC',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    submitButton: {
        padding:10,
        marginTop: 15,
        height: 50,
        overflow:'hidden',
        borderRadius:4,
        backgroundColor: 'green'
    }, 
    submitButtonContent: {
        color:"#FFF",
    },
});


AppRegistry.registerComponent('ProjectListComponent', () => ProjectListComponent)
