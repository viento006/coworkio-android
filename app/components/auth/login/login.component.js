import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

export default class LoginComponent extends Component {
    constructor(props){
        super(props)
        
    }

    formData = {
        email:'test@test.com',
        password:'123456'
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.auth.status === 'authenticated' && nextProps.auth.token && !nextProps.auth.error ){
            //redirect further

            console.log('*******************************************************************')
            console.log('NAVIGATING: MAIN *************************************************')
            console.log('*******************************************************************')
            await AsyncStorage.setItem('token', nextProps.auth.token);
            this.props.navigation.navigate('Main')
        }
    }

    loginPressed() {
        this.props.onSubmit(this.formData, this.props.navigation.navigate );
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: LOGIN *************************************************')
        console.log('*******************************************************************')

        const navParams  = this.formData || this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Login
                </Text>
                {!!navParams.name &&
                    <Text style={styles.instructions}>
                        {navParams.name}, your account has been sucessfully created. You can log in now
                    </Text>
                }
                <TextInput style={styles.inputs} onChangeText={(email)=> this.formData.email = email} 
                    autocorrect={false} placeholder='Email' defaultValue={navParams.email}></TextInput>

                <TextInput style={styles.inputs} onChangeText={(password)=> this.formData.password = password} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.password} placeholder='Password'></TextInput>

                <Button containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}} 
                    style={styles.submitButton} onPress={this.loginPressed.bind(this)}>
                    {this.props.auth.isPending?
                        <ActivityIndicator  color="#fff" animating={this.props.auth.isPending} />: 
                        'Log in'
                    }
                </Button>

                <Text style={styles.register} onPress={() => this.props.navigation.navigate('Register')}>
                    or register
                </Text>
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

AppRegistry.registerComponent('LoginComponent', () => LoginComponent)
