import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator } from 'react-native';
import Button from 'react-native-button';
export default class RegisterComponent extends Component {
    formData = {
        name: '',
        surname: '',
        email: '',
        password: ''
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.isSuccessful && !nextProps.auth.error ){
            //redirect further
            this.props.navigation.navigate('Login', { name: this.formData.name, email: this.formData.email })
        }
    }

    registerPressed(){
        if(this.formData.password === this.formData.repeatPassword){
            this.props.onSubmit(this.formData);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Register
                </Text>

                <TextInput style={styles.inputs} onChangeText={(name)=> this.formData.name = name} autocorrect={false} placeholder='Name'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(surname)=> this.formData.surname = surname} autocorrect={false} placeholder='Surname'></TextInput>  

                <TextInput style={styles.inputs} onChangeText={(email)=> this.formData.email = email} autocorrect={false} placeholder='Email'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(password)=> this.formData.password = password} autocorrect={false} secureTextEntry={true} placeholder='Password'></TextInput>
                
                <TextInput style={styles.inputs} onChangeText={(repeatPassword)=> this.formData.repeatPassword = repeatPassword} autocorrect={false} secureTextEntry={true} placeholder='Repeat Password'></TextInput>

                <Button containerStyle={{padding:10, height:50, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}} 
                    style={styles.submitButton} onPress={this.registerPressed.bind(this)}>
                    {this.props.auth.isPending?
                        <ActivityIndicator  color="#fff" animating={this.props.auth.isPending} />: 
                        'Register'
                    }
                </Button>

                <Text style={styles.login} onPress={() => this.props.navigation.navigate('Login')}>
                    or log in
                </Text>
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
    login: {
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
    }, 
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
})


AppRegistry.registerComponent('RegisterComponent', () => RegisterComponent)
