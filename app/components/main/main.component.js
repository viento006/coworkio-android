import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';

import Menu from '../menu';
import Navigation from '../../navigation/main.navigation';
 class MainComponent extends Component {

  constructor(){
    super();
    this.state = { isOpen: false };
  }

  navigateToProfile(profile){
    this.setState({ isOpen: false });
    this.navigator && this.navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName: 'ViewProfile', params: {profile} });    
  }

  logOut(){
    this.setState({ isOpen: false });
    this.props.navigation.navigate('Login');
  }

  navigateToDashboard(){
    this.setState({ isOpen: false });
    this.navigator && this.navigator.dispatch({ type: 'Navigation/NAVIGATE', routeName: 'Dashboard'});
  }

  render() {
    console.log('*******************************************************************')
    console.log('RENDER: MAIN *************************************************')
    console.log('*******************************************************************')
    
    const menu = <Menu isOpen={this.state.isOpen} navigateToDashboard={this.navigateToDashboard.bind(this)}
                    navigateToProfile={this.navigateToProfile.bind(this)} logOut={this.logOut.bind(this)}/>
    
    return (
      <SideMenu menu={menu}>
        <Navigation ref={nav => { this.navigator = nav; }}/>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
})

AppRegistry.registerComponent('MainComponent', () => MainComponent);

export default connect(null, null)(MainComponent)