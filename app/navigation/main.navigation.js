import { StackNavigator } from 'react-navigation';

import ProjectListComponent from '../components/projects/projectList';
import EditProjectComponent from '../components/projects/edit';

const routeConfiguration  = {
    Dashboard : { screen: ProjectListComponent },
    CreateProject : { screen: EditProjectComponent },
}

const stackNavigatorConfiguration = {
    initialRouteName:'Dashboard'
}

const Navigation = StackNavigator(
    routeConfiguration,
    stackNavigatorConfiguration
);

export default Navigation;
