import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native';

import colors from '../../styles/colors';

export default class MenuComponent extends React.Component {
  componentWillMount(){
    this.props.fetchProfile();
  }

  logOut(){
    this.props.logOut();
    this.props.dispatchLogOut();
  }

  render() {
    const { profile, loading, error } = this.props.profile;
    if(!loading && !error && profile){
      return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../images/coworkio.png')} />
            </View>
            <View style={[styles.option, styles.imageSection]}>
                <Image style={styles.image} source={profile.photoUrl? { uri: profile.photoUrl } : require('../../images/placeholder.jpg')}/>
                <Text style={styles.text}>{profile.firstName} {profile.lastName}</Text>
            </View>
            <View style={[styles.option, styles.search]}>
                <TextInput style={styles.input} placeholder='Поиск' underlineColorAndroid='transparent' placeholderTextColor={colors.themeFontColor}/>
                <TouchableOpacity>
                    <View>
                        <Text style={styles.optionText}> 🔎</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.props.navigateToProfile(profile)}>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Профиль</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigateToDashboard}>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Проекты</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Сменить пароль</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.logOut.bind(this)}>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Выйти</Text>
                </View>
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
      backgroundColor: colors.menuBackground,
  },
  logo: {
      height: 50,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderColor: colors.menuBorder
  },
  option: {
      alignItems: 'center',
      marginBottom: 5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      borderBottomWidth: 1,
      borderColor: colors.menuBorder
  },
  optionText: {
      color: colors.themeFontColor,
      fontSize: 18,
  },
  search: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: '#646E82',
    borderRadius: 50,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.themeFontColor,
  },
  imageSection: {
      flexDirection: 'row'
  },
  image: {
      width: 50,
      borderRadius: 25,
      height: 50,
      marginRight: 10
  },
  text: {
      marginRight: 5,
      marginLeft: 5,
      fontWeight: '500',
      fontSize: 16,
      color: colors.themeFontColor,
  },
})

AppRegistry.registerComponent('MenuComponent', () => MenuComponent)

