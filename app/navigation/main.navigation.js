import { StackNavigator } from "react-navigation";
import { StyleSheet } from "react-native";

import ProjectListComponent from "../components/projects/projectList";
import EditProjectComponent from "../components/projects/edit";
import ViewProjectComponent from "../components/projects/view";
import BoardComponent from "../components/board";
import EditTaskComponent from "../components/task/edit";
import ViewTaskComponent from "../components/task/view";
import ViewProfileComponent from "../components/profile/view";
import EditProfileComponent from "../components/profile/edit";
import SearchComponent from "../components/search";


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6f7c91"
  },
  headerTitle: {
    color: "#ffffff"
  }
});

const routeConfiguration = {
  Dashboard: { screen: ProjectListComponent },
  CreateProject: { screen: EditProjectComponent },
  Board: { screen: BoardComponent },
  CreateTask: { screen: EditTaskComponent },
  ViewTask: { screen: ViewTaskComponent },
  ViewProfile: { screen: ViewProfileComponent },
  EditProfile: { screen: EditProfileComponent },
  ViewProject: { screen: ViewProjectComponent },
  Search: { screen: SearchComponent }
};

const stackNavigatorConfiguration = {
  initialRouteName: "Dashboard",
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerBackTitleStyle: styles.headerTitleStyle
  }
};

const Navigation = StackNavigator(
  routeConfiguration,
  stackNavigatorConfiguration
);

export default Navigation;
