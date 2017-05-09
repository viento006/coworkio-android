import React, { Component } from 'react';
import { AppRegistry, StyleSheet, ScrollView, Text, View, Image, TextInput, Picker, DatePickerAndroid, TouchableOpacity , ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-crop-picker';

import { socialAccountTypes, universities, faculties } from '../enums';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

export default class EditProfileComponent extends Component {
    constructor(props){
        super();
        let { profile } = props.profile; 
        this.state = {
            id: profile.id || '',
            firstName: profile.firstName || '',
            middleName: profile.middleName || '',
            lastName: profile.lastName || '',
            //accountConfirmed
            //role
            email: profile.email || '',
            //password
            projects: profile.projects || [],
            phoneNumber: profile.phoneNumber || '',
            accounts: profile.accounts || [], //TODO:add control
            github: profile.github || '',
            photoUrl: profile.photoUrl || '', //TODO:add control
            university: {
                university: profile.university.university || universities[0].label,
                faculty: profile.university.faculty || faculties[0].label,
                department: profile.university.department || '',
                group: String(profile.university.group) || '',
                startYear: String(profile.university.startYear) || '',
                endYear: String(profile.university.endYear) || '',
            },
            skills: profile.skills || [], //think of autosuggest
            tmpSkill: ''
        };
    }

    componentWillReceiveProps(nextProps){
        console.log('sd')
        if (!nextProps.newProfile.isLoading && !nextProps.newProfile.error && !nextProps.newProfile.profileId){
            this.props.navigation.goBack()
        }
        console.log(nextProps.profile);
        if (nextProps.profile.profile && !nextProps.profile.isLoading){
            this.setState(nextProps.profile.profile);
        }
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: 'Изменить профиль'
    });

    addSkill(){
        this.setState({skills: [...this.state.skills, this.state.tmpSkill], tmpSkill: ''});
    }

    removeSkill(index){
        let skills = this.state.skills.splice(index, 1);
        this.setState({skills});
    }
    changeImage(){
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            let url = 'https://api.cloudinary.com/v1_1/bookva/image/upload';

            let fd = new FormData();
            fd.append("upload_preset", "coworkio")
            fd.append("file", {
                uri: image.path,
                type: image.mime, 
                name: 'ava'
            })

            fetch(url, {
                method: 'post',
                body: fd
            }).then(res => {
                res.json().then((res) => this.setState({photoUrl: res.url}))
            });
        });
    }
    submit(){
        //validate

        let data = {...this.state}
        delete data.tmpSkill;
        delete data.skills;
        this.props.onSubmit(data);
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT PROFILE *************************************************')
        console.log('*******************************************************************')
        console.log(this.props.profile);
        
        return (
            <ScrollView containerStyle={styles.container}>
                <View style={styles.imagePicker}>
                    <TouchableOpacity onPress={this.changeImage.bind(this)}>
                        <Image style={styles.image} source={this.state.photoUrl? {uri: this.state.photoUrl } : require('../../../images/placeholder.jpg')}/>
                    </TouchableOpacity>
                    <Text style={styles.imageText}>Нажмите на изображение чтобы сменить аватар</Text>
                </View>
                <TextInput style={styles.inputs} onChangeText={(firstName)=> this.setState({firstName})}
                    autocorrect={false} placeholder='Имя' value={this.state.firstName}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(middleName)=> this.setState({middleName})}
                    autocorrect={false} placeholder='Отчество' value={this.state.middleName}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(lastName)=> this.setState({lastName})}
                    autocorrect={false} placeholder='Фамилия' value={this.state.lastName}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(email)=> this.setState({email})}
                    autocorrect={false} placeholder='Электронная почта' value={this.state.email}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(phoneNumber)=> this.setState({phoneNumber})}
                    keyboardType='numeric' autocorrect={false} placeholder='Номер телефона' value={this.state.phoneNumber}>
                </TextInput>

                <TextInput style={styles.inputs} onChangeText={(github)=> this.setState({github})}
                    autocorrect={false} placeholder='Аккаунт GitHub' value={this.state.github}>
                </TextInput>

                <View style={styles.tagList}>
                    {this.state.skills.map((skill, index) => 
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{skill}</Text>
                            <TouchableOpacity style={styles.tagClose} onPress={() => this.removeSkill.bind(this)(index)}>
                                <Text style={styles.tagCloseText}>x</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                 <View style={styles.addTagContainer}>
                    <TextInput style={[styles.inputs, styles.addTagInput]} onChangeText={(tmpSkill)=> this.setState({tmpSkill})}
                        autocorrect={false} placeholder='Введите навык' value={this.state.tmpSkill}>
                    </TextInput>
                    <Button containerStyle={styles.addTagButton} style={styles.addTagButtonContent} onPress={this.addSkill.bind(this)}>
                        +
                    </Button>
                </View>

                <View style={styles.picker}>
                    <Picker selectedValue={this.state.university.university}
                        onValueChange={(name) => {
                        let { university } = this.state;
                        university.university = name;
                        this.setState({university})
                    }}>
                        {universities.map((item, index) => <Picker.Item key={index} label={item.label} value={item.label} />)}
                    </Picker>
                </View>
                
                <View style={styles.picker}>
                    <Picker selectedValue={this.state.university.faculty}
                        onValueChange={(faculty) => {
                            let { university } = this.state;
                            university.faculty = faculty;
                            this.setState({university})
                        }}>
                        {faculties.map((item, index) => <Picker.Item key={index} label={item.label} value={item.label} />)}
                    </Picker>
                </View>
                
                <TextInput style={styles.inputs} onChangeText={(department)=> {
                    let { university } = this.state;
                        university.department = department;
                        this.setState({university})
                    }}
                    autocorrect={false} placeholder='Специальность' value={this.state.university.department}>
                </TextInput>
                
                <TextInput style={styles.inputs} onChangeText={(group)=> {
                    let { university } = this.state;
                        university.group = group;
                        this.setState({university})
                    }}
                    autocorrect={false} placeholder='Номер группы' value={this.state.university.group}>
                </TextInput>
                
                <TextInput style={styles.inputs} onChangeText={(startYear)=> {
                    let { university } = this.state;
                        university.startYear = startYear;
                        this.setState({university})
                    }}
                    keyboardType='numeric' autocorrect={false} placeholder='Год начала обучения' value={this.state.university.startYear}>
                </TextInput>
                
                <TextInput style={styles.inputs} onChangeText={(endYear)=> { 
                        let { university } = this.state;
                        university.endYear = endYear;
                        this.setState({university})
                    }} keyboardType='numeric' autocorrect={false} placeholder='Год окончания' value={this.state.university.endYear}>
                </TextInput>

                <Button containerStyle={[formControlStyles.buttonContainer, formControlStyles.submitButtonContainer]} 
                        style={[formControlStyles.buttonContent, formControlStyles.submitButtonContent]} onPress={this.submit.bind(this)}>
                    {this.props.newProfile.isLoading?
                        <ActivityIndicator  color="#fff" animating={this.props.tasks.newTask.isLoading} />: 
                        'Создать'
                    }
                </Button>
            </ScrollView>
        )
    }
}

EditProfileComponent.propTypes = {
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
    imagePicker:{
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 15,
        alignItems: 'center',
    },
    image:{
        width: 100,
        height: 100,
        marginRight: 15
    },
    imageText:{
        flex:1
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
    },
    tagList: {
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 20,
        marginBottom: -10,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 13,
        backgroundColor: 'lightgray',
    },
    tagText: {
        marginRight: 10,
        marginLeft: 5
    },
    tagClose: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: 'red',
    },
    tagCloseText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addTagContainer:{
        flexDirection: 'row',
    },
    addTagInput: {
        flex:1
    },
    addTagButton:{
        height: 30,
        width: 30,
        borderRadius: 15,
        marginTop: 15,
        marginRight: 15,
        backgroundColor: 'green'
    },
    addTagButtonContent:{
        color: 'white',
        fontSize: 20,
    }
})


AppRegistry.registerComponent('EditProfileComponent', () => EditProfileComponent)
