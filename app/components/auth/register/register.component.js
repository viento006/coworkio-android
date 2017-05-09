import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator, Modal } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

import CustomInput from '../../common/form-controls/input.component';

export default class RegisterComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            isError: false
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isSuccessful && !nextProps.auth.error ){
            //redirect further
            this.props.navigation.navigate('Login', { name: this.state.firstName, email: this.state.email, password: this.state.password })
        }
    }

    registerPressed(){
        if(this.state.password === this.state.repeatPassword){
            let data = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
            this.props.onSubmit(data);
        }
        else{
            this.setModalVisibility(true, 'Пароль и подтверждение не совпадают!')
        }
    }
    setModalVisibility(value, message){
        this.setState({isError: value, errorMessage: message});
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={ this.state.isError } 
                    onRequestClose={()=>{}}>
                    <View style={[styles.modalContainer]}>
                        <View style={[styles.modalInnerContainer]}>
                            <Text>{this.state.errorMessage}</Text>
                            <Button
                                onPress={() => this.setModalVisibility(false)}
                                style={styles.modalButton}>
                                Закрыть
                            </Button>
                        </View>
                    </View>
                </Modal>

                <Text style={styles.header}>
                    Регистрация
                </Text>

                <CustomInput title='Имя' value={this.state.firstName} onChangeText={firstName => this.setState({ firstName })}/>

                <CustomInput title='Фамилия' value={this.state.lastName} onChangeText={lastName => this.setState({ lastName })}/>

                <CustomInput title='Email' value={this.state.email} onChangeText={email => this.setState({ email })}/>

                <CustomInput title='Пароль' value={this.state.password} secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}/>

                <CustomInput title='Повторите пароль' value={this.state.repeatPassword} secureTextEntry={true}
                    onChangeText={repeatPassword => this.setState({ repeatPassword })}/>

                <Button containerStyle={[formControlStyles.buttonContainer, formControlStyles.submitButtonContainer]} 
                        style={[formControlStyles.buttonContent, formControlStyles.submitButtonContent]} onPress={this.registerPressed.bind(this)}>
                    {this.props.auth.isPending?
                        <ActivityIndicator  color="#fff" animating={this.props.auth.isPending} />: 
                        'Зарегистрироваться'
                    }
                </Button>
                <Button containerStyle={formControlStyles.buttonContainer} style={formControlStyles.buttonContent} onPress={() => this.props.navigation.navigate('Login')}>
                    Войти
                </Button>
            </View>
        );
    }
}

RegisterComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.defaultBackground,
        padding: 20

    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: colors.blockContent
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
    submitButton: {
        color:"#fff",
    }, 
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalInnerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#fff', 
        padding: 20
    },  
    modalButton: {
        marginTop: 10,
    },
})


AppRegistry.registerComponent('RegisterComponent', () => RegisterComponent)
