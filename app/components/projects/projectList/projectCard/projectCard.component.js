import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../../styles/colors';
import formControlStyles from '../../../../styles/form-controls';

export default class ProjectCardComponent extends Component {
    render() {
        const { project } = this.props; 
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={.8}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.title}>
                            {project.title}
                        </Text>
                        <Text style={styles.description}>
                            {project.description}
                        </Text>
                    </View>
                    <Button containerStyle={[formControlStyles.buttonContainer, formControlStyles.submitButtonContainer]} 
                            style={[formControlStyles.buttonContent, formControlStyles.submitButtonContent]} onPress={this.props.openBoard}>
                        Открыть доску заданий
                    </Button>
                </View>
            </TouchableOpacity>
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
        marginTop: 10,
        backgroundColor: colors.cardBackground,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        color: colors.darkFontColor,
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        color: colors.defaultFontColor,
    },
});


AppRegistry.registerComponent('ProjectListComponent', () => ProjectListComponent)
