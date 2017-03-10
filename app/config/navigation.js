import { StackNavigator } from 'react-navigation';

import LoginComponent from '../components/auth/login.component';
import MainComponent from '../components/main/main.component';

const routeConfiguration  = {
    Login :{ screen: LoginComponent },
    Main :{ screen: MainComponent }
}

const stackNavigatorConfiguration = {
    headerMode:'none',
    initialRouteName:'Login'
}

const Navigation = StackNavigator(
    routeConfiguration,
    stackNavigatorConfiguration
);

export default Navigation;
