import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../styles/default';

export interface ButtonProps {
    title: string;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export default Button;