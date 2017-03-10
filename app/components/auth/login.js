import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';
export default class LoginComponent extends Component {

    componentWillReceiveProps(nextProps){
        if (nextProps.auth.status === 'authenticated' && nextProps.auth.token && !nextProps.auth.error ){
            //redirect further
        }
    }

    loginPressed(){
        const data = {
            email: this.refs.email.value,
            password: this.refs.password.value
        };
        this.props.navigation.navigate('Main')
        //this.props.onSubmit( data );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Login Component!!!
                </Text>
                <Text style={styles.instructions}>
                    {this.props.text}
                </Text>
                <TextInput style={styles.inputs} refs='email' autocorrect={false} placeholder='Login'></TextInput>
                <TextInput style={styles.inputs} autocorrect={false} secureTextEntry={true} placeholder='Password'></TextInput>
                <Button containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'green'}} style={styles.submitButton} onPress={this.loginPressed}>Log in</Button>
            </View>
        );
    }
}

LoginComponent.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};

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
    inputs: {
        color: '#333333',
        marginLeft: 20,
        marginRight: 20
    },
    submitButton: {
        color:"#fff"
    }
});


AppRegistry.registerComponent('MainComponent', () => LoginComponent);
