import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../styles/default';

interface ButtonProps {
    title: string;
    onPress: () => void;
}

interface ButtonBoxProps {
    buttons: ButtonProps[];
}

const ButtonBox: React.FC<ButtonBoxProps> = (props) => {
    return (
        <View style={styles.containerTop}>
            <View style={styles.containerBox}> 
                {props.buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={button.onPress}>
                        <Text style={styles.buttonText}>{button.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ButtonBox;