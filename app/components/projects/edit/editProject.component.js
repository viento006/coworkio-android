import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,ScrollView, TextInput, Picker, DatePickerAndroid, TouchableOpacity , ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class EditProjectComponent extends Component {
    
    constructor(){
        super();
        this.state = {
            title:'',
            description:'',
            startDate:'',
            endDate:'',
            position:'',
            githubLink:'',
        };
    }

    componentWillReceiveProps(nextProps){
        if (!nextProps.projects.newProject.isLoading && !nextProps.projects.error && nextProps.projects.newProject.projectID ){
            this.props.navigation.navigate('Dashboard')
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: navigation.state.params 
            ? (navigation.state.params.isEdit ? 'Редактировать': 'Создать' ) +' проект' 
            : ''
    });

    selectOptions= [{label:'Hello', value: '1'}, {label:'Value', value: '2'}]
    showPicker = async (key) => {
        try {
            let newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open();
            if (action === DatePickerAndroid.dismissedAction) {
            } else {
                let date = new Date(year, month, day);
                newState[key] = date;
                this.setState(newState);
            }
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    };

    formatDate(date){
        return date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : 'Выберите дату';
    }

    submit(){
        //validate
        this.props.onSubmit(this.state);
    }
    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT PROJECT *************************************************')
        console.log('*******************************************************************')
        return (
            <ScrollView>
            <View style={styles.container}>
                <TextInput style={styles.inputs} onChangeText={(title)=> this.setState({title})}
                    autocorrect={false} placeholder='Название' />
                <TouchableOpacity   style={styles.datepicker}
                    onPress={this.showPicker.bind(this, 'startDate')}>
                    <View><Text style={styles.text}>Дата старта: {this.formatDate(this.state.startDate)}</Text></View>
                </TouchableOpacity >
                <TouchableOpacity style={styles.datepicker}
                    onPress={this.showPicker.bind(this, 'endDate')}>
                    <View><Text style={styles.text}>Дата окончания: {this.formatDate(this.state.endDate)}</Text></View>
                </TouchableOpacity  >
                <View style={styles.picker}><Picker selectedValue={this.state.position}
                    onValueChange={(position) => this.setState({position})}>
                    {this.selectOptions.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                </Picker></View>
                <TextInput style={styles.inputs} multiline={true}onChangeText={(description)=> this.setState({description})}
                    autocorrect={false} value={this.state.description} placeholder='Описание'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(githubLink)=> this.setState({githubLink})}
                    autocorrect={false} value={this.state.githubLink} placeholder='Github'></TextInput>
                
                <Button containerStyle={[formControlStyles.buttonContainer, formControlStyles.submitButtonContainer]} 
                        style={[formControlStyles.buttonContent, formControlStyles.submitButtonContent]} onPress={this.submit.bind(this)}>
                    {this.props.projects.newProject.isLoading?
                        <ActivityIndicator  color="#fff" animating={this.props.projects.newProject.isLoading} />: 
                        'Create'
                    }
                </Button>
            </View>
            </ScrollView>
        )
    }
}

EditProjectComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
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
    datepicker: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 10,
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 0.7,
        borderColor: '#333333',
    },
    picker: {
        marginLeft: 25,
        marginRight: 25,
        borderBottomWidth: 0.7,
        borderColor: '#333333',
    },
    submitButton: {
        color:"#fff",
        fontWeight: 'bold'
    },
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
  }
})


AppRegistry.registerComponent('EditProjectComponent', () => EditProjectComponent)
