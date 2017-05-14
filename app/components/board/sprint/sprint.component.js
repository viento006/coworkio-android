import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native';
import Button from 'react-native-button';

import BoardColumn from '../column/boardColumn.component';

import colors from '../../../styles/colors';

export default class SprintComponent extends Component {
    scrollView = null;
    isScrolling = false;
    componentWillReceiveProps(nextProps){
        
    }

    onScroll(event) {
        
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
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.sprint.id === 0 ? 'Оставшиеся задания' : this.props.sprint.name}</Text>            
                <ScrollView horizontal={true} ref={(scrollView) => { this.scrollView = scrollView; }}
                    onMomentumScrollEnd={this.onEndDrag.bind(this)}
                    onScroll={this.onScroll.bind(this)} automaticallyAdjustContentInsets={false}>
                        { this.props.boardConfig.statuses.map((status, index) => {
                            const availableStatuses = this.props.boardConfig.statuses;
                            const tasks = this.props.tasks.filter((task) => task.status === status.order).map(task =>  { return {...task, availableStatuses}});
                            return <BoardColumn title={status.title} key={index} tasks={tasks} updateTask={this.props.updateTask} viewTask={this.props.viewTask}
                                        createTask={()=>this.props.createTask(this.props.sprint.id, status.order)}></BoardColumn> })
                        }
                </ScrollView>
            </View>
        );
    }
}

SprintComponent.propTypes = {
    sprint: React.PropTypes.any.isRequired,
    boardConfig: React.PropTypes.any.isRequired,
    tasks: React.PropTypes.any.isRequired,
    updateTask: React.PropTypes.func.isRequired,
    viewTask: React.PropTypes.func.isRequired,

}

const styles = StyleSheet.create({
    title:{
        paddingLeft: 10,
        marginTop: 10,
        color: colors.darkFontColor,
        fontSize: 30,
    }
})


AppRegistry.registerComponent('SprintComponent', () => SprintComponent)
