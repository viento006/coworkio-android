import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  option: {
    color: 'black',
    marginBottom: 5,
  },
})

const MenuComponent = 
    <View style={styles.container}>
      <Text style={styles.option}>
        Option 1
      </Text>
      <Text style={styles.option}>
        Option 2
      </Text>
      <Text style={styles.option}>
        Option 3
      </Text>
    </View>



export default MenuComponent
