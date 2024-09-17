import { View, Text, Image } from 'react-native';

import styles from '../styles/default';

interface SelectionBoxProps {
    title?: string;
    text?: string;
    image?: any; // Should be a valid React Node, not a string
}

const InfoBox: React.FC<SelectionBoxProps> = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerBox}>
                {props.title && <Text style={styles.title}>{props.title}</Text>}
                {props.image && <Image source={props.image} style={styles.image} />}
                {props.text && <Text style={styles.text}>{props.text}</Text>}
            </View>
        </View>
    );
};

export default InfoBox;
