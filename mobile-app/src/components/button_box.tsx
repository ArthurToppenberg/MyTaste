import { View, Text, TouchableOpacity } from 'react-native';

import Button, {ButtonProps} from './button';

import styles from '../styles/default';

interface ButtonBoxProps {
    buttons: ButtonProps[];
}

const ButtonBox: React.FC<ButtonBoxProps> = (props) => {
    return (
        <View style={styles.containerTop}>
            <View style={styles.containerBox}> 
                {props.buttons.map((button, index) => (
                    <Button key={index} title={button.title} onPress={button.onPress} />
                ))}
            </View>
        </View>
    );
};

export default ButtonBox;