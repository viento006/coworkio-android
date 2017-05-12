import { StyleSheet } from 'react-native';

import colors from './colors'

export default styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 15,
        padding: 10, 
        height: 45, 
        overflow:'hidden', 
        backgroundColor: colors.buttonBackground,
        borderWidth: 1,
        borderColor: colors.border
    },
    buttonContent: {
        fontWeight: 'normal',
        color: colors.darkFontColor
    },
    submitButtonContainer: {
        backgroundColor: colors.submitButtonBackground
    },
    submitButtonContent: {
        color: colors.themeFontColor,
    },
    navbarButtonContainer:{
        height: 50,
        width: 50,
        marginRight: 10
    },
    navbarButtonContent:{
        color: '#ffffff',
        fontSize: 36,
        fontWeight: '100'
    }
});