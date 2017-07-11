import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import colors from '../../../styles/colors';


export default class InfoCardSectionComponent extends Component {
    render() {
        if (this.props.isVisible || this.props.isVisible === undefined) {
            return (
                <View style={styles.block}>                    
                    {this.props.icon &&
                        <Image source={this.props.icon} style={styles.icon} />
                    }
                    
                    {this.props.title &&
                        <Text style={styles.property}>
                            {this.props.title}:
                        </Text>
                    }
                
                    <Text style={styles.value}>
                        {this.props.value}
                    </Text>
                </View>
            )
        } else {
            return <View></View>
        }
    }
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 5,
        marginTop: 0,
    },
    property: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.darkFontColor,
        marginRight: 5
    },
    value:{
        fontSize: 16,
        color: colors.darkFontColor,
    },
    icon: {
        width: 26,
        height: 26,
        marginRight: 5
    }
})
