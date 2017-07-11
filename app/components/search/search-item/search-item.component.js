import React, { Component } from "react";
import { AppRegistry, View } from "react-native";

import ProjectCard from "../../projects/projectList/projectCard/projectCard.component";

import colors from "../../../styles/colors";


export default class SearchItemComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          searchString: props.navigation.state.searchString
      };
    }

    openBoard(project){
        this.props.navigation.navigate('Board', { project })
    }

    openProject(project){
        this.props.navigation.navigate('ViewProject', { project })
    }

    render() {
        if(this.props.project){
            return <ProjectCard project={this.props.project} 
                openBoard={() => this.openBoard.call(this, this.props.project)} onPress={this.openProject.bind(this, this.props.project)}></ProjectCard>
        }
        return (
            <View></View>
        );
    }
}

AppRegistry.registerComponent("SearchItemComponent", () => SearchItemComponent);
