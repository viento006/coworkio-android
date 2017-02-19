import React, { Component } from 'react';
import { AppRegistry } from 'react-native'; 
import App from './app/config/app';

export default class Coworkio extends Component {
  render() {
    return (
      <App>
      </App>
    );
  }
}

AppRegistry.registerComponent('Coworkio', () => Coworkio);