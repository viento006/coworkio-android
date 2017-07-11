import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, ActivityIndicator, AsyncStorage, Modal, TouchableHighlight, Keyboard, Animated } from 'react-native';
import Button from 'react-native-button';

import colors from '../../../styles/colors';
import formControlStyles from '../../../styles/form-controls';

import { Input } from '../../common/form-controls';


export default class LoginComponent extends Component {
    constructor(props){
        super(props)
        let email = props.navigation.state.params && props.navigation.state.params.email;
        let password = props.navigation.state.params && props.navigation.state.params.password;
        this.state = {
            isRequestError: false,
            errorFields: {},
            email: email || 'test@test.com',
            password:password ||'123456',
            imageSize: new Animated.Value(150)
        };
    }

    async componentWillReceiveProps(nextProps) {
        this.setModalVisibility(nextProps.auth.status === 'error')

        if (nextProps.auth.status === 'authenticated' && nextProps.auth.token && nextProps.auth.status !== 'error'  && !nextProps.auth.isPending){
            await AsyncStorage.setItem('token', nextProps.auth.token)
            this.props.navigation.navigate('Main')
        }
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow() {
        Animated.timing(
            this.state.imageSize, 
            {
              toValue: 50,
              duration: 500,
            },
        ).start();
    }

    keyboardDidHide() {
        Animated.timing(
            this.state.imageSize, 
            {
              toValue: 150,
              duration: 500,
            },
        ).start();
    }

    loginPressed() {
        let data = { email: this.state.email, password: this.state.password };
        this.props.onSubmit(data);
    }

    setModalVisibility(value){
        this.setState({isRequestError: value});
    }

    isValid(){
        for(let fieldName in this.state.errorFields){
            if(this.state.errorFields[fieldName]){
                return false;
            }
        }

        return true;
    }

    render() {
        const userData  = this.state;

        return (
            <View style={styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={ this.state.isRequestError } 
                    onRequestClose={()=>{}}>
                    <View style={[styles.modalContainer]}>
                        <View style={[styles.modalInnerContainer]}>
                            <Text>Неправильные email и пароль</Text>
                            <Button
                                onPress={() => this.setModalVisibility(false)}
                                style={styles.modalButton}>
                                Закрыть
                            </Button>
                        </View>
                    </View>
                </Modal>
                <View style={styles.header}>
                    <Animated.Image style={{height: this.state.imageSize, width: this.state.imageSize}} source={require('../../../images/login-icon.png')}/>
                </View>
                <View style={styles.content}>
                {!!userData.name &&
                    <Text style={styles.instructions}>
                        {userData.name}, ваш аккаунт был успешно создан. Вы можете войти в приложение
                    </Text>
                }
                
                <Input title='Электронная почта' value={userData.email} required={ true } 
                    onChangeText={(email, isError) => { this.setState({ email, errorFields: { email: isError }}) }}/>

                <Input title='Пароль' value={userData.password} required={true}
                     secureTextEntry={true} onChangeText={(password, isError) => { this.setState({ password, errorFields: { password: isError }}) }} />

                <Button disabled={!this.isValid.bind(this)() || this.props.auth.isPending } containerStyle={[formControlStyles.buttonContainer, formControlStyles.submitButtonContainer]} 
                        style={[formControlStyles.buttonContent, formControlStyles.submitButtonContent]} onPress={this.loginPressed.bind(this)}>
                    {this.props.auth.isPending?
                        <ActivityIndicator color="#fff" animating={this.props.auth.isPending} />: 
                        'Войти'
                    }
                </Button>
                <Button disabled={this.props.auth.isPending} containerStyle={formControlStyles.buttonContainer} style={formControlStyles.buttonContent} onPress={() => this.props.navigation.navigate('Register')}>
                    Зарегистрироваться
                </Button>
                </View>
            </View>
        )
    }
}

LoginComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.defaultBackground,
    },
    header: {
        backgroundColor: colors.themeBackground,
        flex: 1,
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        padding: 20
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
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

AppRegistry.registerComponent('LoginComponent', () => LoginComponent)
