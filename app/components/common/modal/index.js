import { Modal, View, Text, Button } from 'react-native';

import styles from './styles';


const modal = <Modal
    animationType={"slide"}
    transparent={true}
    visible={ this.formData.isError } 
    onRequestClose={()=>{}}>
    <View style={[styles.container, modalBackgroundStyle]}>
        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Text>Email or password that you have entered are incorrect</Text>
            <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
            </Button>
        </View>
    </View>
</Modal>