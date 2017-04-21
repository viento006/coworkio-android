import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

export default class ProjectListComponent extends Component {
    constructor(props){
        super(props)
        
    }
    componentWillMount(){
        this.props.fetchProjectsByUser()
    }
    componentWillReceiveProps(nextProps) {
        
    }

    createProject() {
        this.props.navigation.navigate('CreateProject')
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: PROJECT LIST *************************************************')
        console.log('*******************************************************************')
        const { projects } = this.props.projects; 
        if(!projects.length){
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        There are no projects for now.You can
                    </Text> 
                    <TouchableOpacity onPress={(this.createProject.bind(this))}>
                        <Text>create one</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Projects:
                </Text>
            </View>
        )
    }
}

ProjectListComponent.propTypes = {
    fetchProjectsByUser: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
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
    register: {
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
    }
});


AppRegistry.registerComponent('ProjectListComponent', () => ProjectListComponent)
