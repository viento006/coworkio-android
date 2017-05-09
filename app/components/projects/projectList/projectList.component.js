import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import ProjectCard from './projectCard/projectCard.component'

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class ProjectListComponent extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Ваши проекты',
        headerRight: <Button containerStyle={formControlStyles.navbarButtonContainer} style={formControlStyles.navbarButtonContent}
                        onPress={()=>{navigation.navigate('CreateProject', {isEdit: false})}}> + </Button>
    });

    constructor(props){
        super(props)
        
    }
    componentWillMount(){
        this.props.fetchProjectsByUser()
    }

    createProject() {
        this.props.navigation.navigate('CreateProject', {isEdit: false})
    }

    openBoard(project){
        this.props.navigation.navigate('Board', { project })
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
                            {activeProjects.map((project, index) => 
                                <ProjectCard key={index} project={project} openBoard={() => this.openBoard.call(this, project.project)}></ProjectCard>)
                            }
                        </ScrollView>
                    }
                    { !!inactiveProjects.length &&
                        <ScrollView>
                            <Text style={styles.projectSectionHeader}>
                                Завершенные проекты
                            </Text>
                            {inactiveProjects.map((project, index) => 
                                <ProjectCard key={index} project={project} openBoard={() => this.openBoard.call(this, project.project)}></ProjectCard>)
                            }
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
        backgroundColor: colors.defaultBackground,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: colors.darkFontColor,
    },
    projectSectionHeader: {
        fontSize: 24,
        marginTop: 20,
        marginLeft: 20,
        color: colors.darkFontColor
    },
});


AppRegistry.registerComponent('ProjectListComponent', () => ProjectListComponent)
