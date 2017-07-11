import { StackNavigator } from 'react-navigation';

import LoginComponent from '../components/auth/login';
import RegisterComponent from '../components/auth/register';
import MainComponent from '../components/main/main.component';


const routeConfiguration  = {
    Login : { screen: LoginComponent },
    Register : { screen: RegisterComponent },
    Main : { screen: MainComponent }
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
