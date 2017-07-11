import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView} from 'react-native';
import Button from 'react-native-button';

import Sprint from './sprint/sprint.component';

import colors from '../../styles/colors';


export default class BoardComponent extends Component {
    scrollView = null;
    isScrolling = false;

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Доска заданий ${navigation.state.params.project.title}`,
    });

    componentDidMount(){
        this.props.getTasks(this.props.navigation.state.params.project.id);
    }

    createTask(sprintId, status){
        const { project } = this.props.navigation.state.params;
        
        this.props.navigation.navigate('CreateTask',{ sprintId, status, project });
    }

    viewTask(task){
        const { project } = this.props.navigation.state.params;        
        this.props.navigation.navigate('ViewTask', { task, project });
    }

    onEndDrag(event){
        let width  = Dimensions.get('window').width * 0.8;

        let currentOffset = event.nativeEvent.contentOffset.x;
        let isLeftToRight = currentOffset > this.offset;
        let page = Math.floor(currentOffset / width);

        let nextStop = (page + ( isLeftToRight ? 1 : 0)) * width;
        this.scrollView.scrollTo({x: nextStop, animated: true});

        this.offset = currentOffset;
    }

    render() {
        const { project } = this.props.navigation.state.params;
        const { tasks } = this.props.tasks;
        let height  = Dimensions.get('window').height;
        
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.container}>
                <ScrollView horizontal={true} ref={(scrollView) => { this.scrollView = scrollView; }}
                    onMomentumScrollEnd={this.onEndDrag.bind(this)} automaticallyAdjustContentInsets={false}>
                    { project.sprints.map((sprint, index) => {
                        const sprintTasks = tasks.filter((task) => task.sprintId == sprint.id)
                        return <Sprint sprint={sprint} key={index} boardConfig={project.board} 
                                    createTask={this.createTask.bind(this)} viewTask={this.viewTask.bind(this)}
                                    updateTask={this.props.updateTask} tasks={sprintTasks}></Sprint>
                        })
                    }
                </ScrollView>
            </ScrollView>
        );
    }
}

BoardComponent.propTypes = {
    getTasks: React.PropTypes.func.isRequired,
    updateTask: React.PropTypes.func.isRequired, 
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch", 
        flexGrow:1,
        backgroundColor: colors.buttonBackground,
    },
})

AppRegistry.registerComponent('BoardComponent', () => BoardComponent)
