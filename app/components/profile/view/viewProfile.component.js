import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Picker, DatePickerAndroid, TouchableOpacity , ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

export default class ViewProfileComponent extends Component {
    
    constructor(){
        super();
    }

    componentWillMount(){
        this.props.getProfile(this.props.navigation.state.params.profile.id);
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: `Ваш профиль`,
        headerRight: <Button containerStyle={styles.addProjectButton} style={styles.addProjectButtonContent}
                       onPress={()=>{navigation.navigate('EditProfile', { profile: navigation.state.params.profile})}}> ✎ </Button>
    });

    getFormattedDate(timestamp) {
        var date = new Date(timestamp);

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        month = (month < 10 ? "0" : "") + month;
        day = (day < 10 ? "0" : "") + day;
        hour = (hour < 10 ? "0" : "") + hour;
        min = (min < 10 ? "0" : "") + min;

        var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min;

        return str;
    }

    render() {
        const { profile } = this.props;
        console.log('*******************************************************************')
        console.log('RENDER: VIEW PROFILE *************************************************')
        console.log('*******************************************************************')
        return (            
            <View style={styles.container}>
                { profile.tags && profile.tags.length ? <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Теги:
                    </Text>
                    <Text style={styles.value}>
                        {profile.description}
                    </Text>
                </View>: <View></View>
                }
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Описание
                    </Text>
                    <Text style={styles.value}>
                        {profile.description}
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Уровень задачи
                    </Text>
                    <Text style={styles.value}>
                        
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Тип задачи
                    </Text>
                    <Text style={styles.value}>

                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Оценка
                    </Text>
                    <Text style={styles.value}>
                        {profile.estimate} часов
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Приоритет
                    </Text>
                    <Text style={styles.value}>
                    
                    </Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionName}>
                        Готово к дате
                    </Text>
                    <Text style={styles.value}>
                        {this.getFormattedDate(profile.dueDate)}
                    </Text>
                </View>
            </View>
        )
    }
}

ViewProfileComponent.propTypes = {
    getProfile: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    section: {
        margin: 10
    },
    sectionName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    editprofileButton:{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginRight: 10
    },
    editprofileButtonContent:{
        color: 'green',
        fontSize: 20,
    }
})


AppRegistry.registerComponent('ViewProfileComponent', () => ViewProfileComponent)
