import React, { Component } from 'react';
import { AppRegistry } from 'react-native'; 
import MainComponent from './app/components/main.component';

export default class Coworkio extends Component {
  render() {
    return (
      <MainComponent>
      </MainComponent>
    );
  }
}

AppRegistry.registerComponent('Coworkio', () => Coworkio);