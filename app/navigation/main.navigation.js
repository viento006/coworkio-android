import { StackNavigator } from 'react-navigation';

import ProjectListComponent from '../components/projects/projectList';
import EditProjectComponent from '../components/projects/edit';
import BoardComponent from '../components/board';
import EditTaskComponent from '../components/task/edit';
import ViewTaskComponent from '../components/task/view';
import ViewProfileComponent from '../components/profile/view';
import EditProfileComponent from '../components/profile/edit';


const routeConfiguration  = {
    Dashboard: { screen: ProjectListComponent },
    CreateProject: { screen: EditProjectComponent },
    Board: { screen: BoardComponent },
    CreateTask: { screen: EditTaskComponent },
    ViewTask: { screen: ViewTaskComponent },
    ViewProfile:{ screen: ViewProfileComponent},
    EditProfile:{ screen: EditProfileComponent},
}

const stackNavigatorConfiguration = {
    initialRouteName: 'Dashboard'
}

const Navigation = StackNavigator(
    routeConfiguration,
    stackNavigatorConfiguration
);

export default Navigation;
