import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import Button from 'react-native-button';

import Sprint from './sprint/sprint.component';

export default class BoardComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Доска заданий ${navigation.state.params.project.title}`,
        //headerRight: <Button containerStyle={styles.addProjectButton} style={styles.addProjectButtonContent}
        //                onPress={()=>{navigation.navigate('CreateProject', {isEdit: false})}}> + </Button>
    });

    componentWillReceiveProps(nextProps){

    }

    componentWillMount(){
        this.props.getTasks(this.props.navigation.state.params.project.id);
    }

    render() {
        const { project } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                { project.sprints.map((sprint, index) => {
                    
                    return <Sprint sprint={sprint} key={index} boardConfig={project.board}></Sprint>})
                }
            </View>
        );
    }
}

BoardComponent.propTypes = {
    getTasks: React.PropTypes.func.isRequired
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


AppRegistry.registerComponent('BoardComponent', () => BoardComponent)
