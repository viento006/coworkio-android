import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import InfoCard from '../common/infoCard/infoCard.component';
import SearchItem from './search-item/search-item.component'

import colors from "../../styles/colors";


export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: props.navigation.state.params.searchString
    };
  }

  componentDidMount(){
    this.search(this.state.searchString);
  }

  search = (argument) => {
    this.props.search(argument);
  }

  render() {
      return (
          <View style={styles.container}>
              <InfoCard style={styles.searchBox}>
                  <TextInput
                      style={styles.input}
                      placeholder="Поиск"
                      value={this.state.searchString}
                      onChangeText={(searchString)=> this.setState({searchString})}
                  />
                  <TouchableOpacity onPress={() => this.search(this.state.searchString)}>
                      <View>
                          <Text style={styles.optionText}> 🔎</Text>
                      </View>
                  </TouchableOpacity>
              </InfoCard>
              <ScrollView style={styles.content}>
                  {this.props.projects.projects.map((project, i)=>
                      <SearchItem key={i} project={project} navigation={this.props.navigation}></SearchItem>
                  )}
              </ScrollView>
          </View>
        );
    }
}

SearchComponent.propTypes = {
    search: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultBackground,
        paddingLeft: 10,
        paddingRight: 10,
    },
    content: {
        flex: 1
    },
    searchBox: {
        flexDirection: 'row'
    },
    optionText: {
        color: colors.themeFontColor,
        fontSize: 18
    },
    input: {
        flex: 1
    }
});

AppRegistry.registerComponent("SearchComponent", () => SearchComponent);
