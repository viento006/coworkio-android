import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';

import Menu from '../menu/menu.component';
import Navigation from '../../navigation/main.navigation';
 class MainComponent extends Component {

  render() {
    console.log('*******************************************************************')
    console.log('RENDER: MAIN *************************************************')
    console.log('*******************************************************************')

    return (
      <SideMenu menu={Menu}>
        <Navigation></Navigation>
      </SideMenu>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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