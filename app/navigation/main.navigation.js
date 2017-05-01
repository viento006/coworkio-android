import { StackNavigator } from 'react-navigation';

import ProjectListComponent from '../components/projects/projectList';
import EditProjectComponent from '../components/projects/edit';
import BoardComponent from '../components/board';

const routeConfiguration  = {
    Dashboard: { screen: ProjectListComponent },
    CreateProject: { screen: EditProjectComponent },
    Board: { screen: BoardComponent },
}

const stackNavigatorConfiguration = {
    initialRouteName: 'Dashboard'
}

const Navigation = StackNavigator(
    routeConfiguration,
    stackNavigatorConfiguration
);

export default Navigation;
