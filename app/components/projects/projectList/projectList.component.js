import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import ProjectCard from './projectCard/projectCard.component'

export default class ProjectListComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Ваши проекты',
        headerRight: <Button containerStyle={styles.addProjectButton} style={styles.addProjectButtonContent}
                        onPress={()=>{navigation.navigate('CreateProject', {isEdit: false})}}> + </Button>
    });

    constructor(props){
        super(props)
        
    }
    componentWillMount(){
        this.props.fetchProjectsByUser()
    }
    componentWillReceiveProps(nextProps) {
        
    }

    createProject() {
        this.props.navigation.navigate('CreateProject', {isEdit: false})
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: PROJECT LIST *************************************************')
        console.log('*******************************************************************')
        const { projects }  = this.props.projects;

        if(!projects.length){
            return (
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                        Здесь пока пусто. Вы можете
                    </Text> 
                    <TouchableOpacity onPress={(this.createProject.bind(this))}>
                        <Text>создать новый проект</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            const activeProjects  = projects.filter((project) => project.current);
            const inactiveProjects  = projects.filter((project) => !project.current);

            return (
                <View style={styles.container}>
                    { !!activeProjects.length &&
                        <ScrollView>
                            <Text style={styles.projectSectionHeader}>
                                Активные проекты
                            </Text> 
                            {activeProjects.map((project, index) => <ProjectCard key={index} project={project}></ProjectCard>)}
                        </ScrollView>
                    }
                    { !!inactiveProjects.length &&
                        <ScrollView>
                            <Text style={styles.projectSectionHeader}>
                                Завершенные проекты
                            </Text>
                            {inactiveProjects.map((project, index) => <ProjectCard key={index} project={project}></ProjectCard>)}
                        </ScrollView>
                    }
                </View>
            )
        }
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
    projectSectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
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
        color:"#FFF",
    },
    addProjectButton:{
        backgroundColor: 'green',
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    addProjectButtonContent:{
        color: '#FFF',
        fontSize: 20,
    }
});


AppRegistry.registerComponent('ProjectListComponent', () => ProjectListComponent)
