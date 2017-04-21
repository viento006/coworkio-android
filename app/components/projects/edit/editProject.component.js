import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, ActivityIndicator, AsyncStorage } from 'react-native';
import Button from 'react-native-button';

export default class EditProjectComponent extends Component {
    constructor(props){
        super(props)
        
    }

    formData = {
        email:'test@test.com',
        password:'123456'
    }

   static navigationOptions = {
       title: this.props.navigation.state.params.project ? 'Edit': 'Create' +' project'
   }

    loginPressed() {
        this.props.onSubmit(this.formData, this.props.navigation.navigate );
    }

    render() {
        console.log('*******************************************************************')
        console.log('RENDER: EDIT PROJECT *************************************************')
        console.log('*******************************************************************')

        const navParams  = this.formData || this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputs} onChangeText={(title)=> this.formData.title = title}
                    autocorrect={false} placeholder='Title' defaultValue={navParams.title}></TextInput>

                <TextInput style={styles.inputs} onChangeText={(description)=> this.formData.description = description} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.description} placeholder='Description'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(description)=> this.formData.description = description} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.description} placeholder='Description'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(description)=> this.formData.description = description} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.description} placeholder='Description'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(description)=> this.formData.description = description} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.description} placeholder='Description'></TextInput>

                <TextInput style={styles.inputs} onChangeText={(github)=> this.formData.github = github} 
                    autocorrect={false} secureTextEntry={true} defaultValue={navParams.github} placeholder='Github'></TextInput>

               

                    <div className="form-group">
                        <label>Дата начала проекта</label>
                        <input type="date" className="form-control" ref="startDate" required="required"/>
                    </div>
                    
                    <div className="form-group">
                        <label>Дата окончания</label>
                        <input type="date" className="form-control" ref="endDate"/>
                    </div>

                    <div className="form-group">
                        <label>Позиции</label>
                        <select type="text" className="form-control" ref="positions" multiple>
                            <option value="">Выберите одну или несколько позиций</option>
                            {selectOptions}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Ссылка на Github</label>
                        <input type="text" className="form-control" ref="githubLink"/>
                    </div>
                
            </View>
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
