import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';

import colors from '../../styles/colors';

export default class MenuComponent extends React.Component {
  componentWillMount(){
    this.props.fetchProfile();
  }

  render() {
    const { profile, loading, error } = this.props.profile;
    if(!loading && !error && profile){
      return (
        <View style={styles.container}>
          <Text style={styles.option}>
            Добро пожаловать, {profile.firstName}
          </Text>
          <TouchableOpacity onPress={() => this.props.navigateToProfile(profile)}>
            <Text style={styles.option}>Профиль</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.navigateToDashboard}>
            <Text style={styles.option}>Проекты</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
          <ActivityIndicator color="#fff" animating={loading} />
      </View>
    )    
  }
}

MenuComponent.propTypes = {
    navigateToProfile: React.PropTypes.func.isRequired,
    navigateToDashboard: React.PropTypes.func.isRequired,
    fetchProfile: React.PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeBackground,
  },
  option: {
    color: colors.themeFontColor,
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('MenuComponent', () => MenuComponent)

