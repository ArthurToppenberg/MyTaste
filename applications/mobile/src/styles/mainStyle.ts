import { StyleSheet } from 'react-native';

const mainStyle = StyleSheet.create({
    container_top: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'black',
    },
    container_center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    title: {
        fontSize: 70,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'MyTaste_Logo',
        color: 'white',
    },
    subtitle: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'MyTaste_Logo',
        color: 'white',
    },
    button_large: {
        width: '80%',
        margin: 10,
        padding: 15,
        borderWidth: 1,
        borderBlockColor: 'white',
    },
    button_large_text: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'MyTaste_Regular',
        color: 'white',
    },
    button_medium_inverted: {
        width: '80%',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderBlockColor: 'white',
        backgroundColor: 'white',
    },
    button_medium_text_inverted: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'MyTaste_Regular',
        color: 'black',
    },
    text_error: {
        color: 'red',
    },
    input_large: {
        width: '80%',
        margin: 10,
        padding: 15,
        borderWidth: 1,
        color: 'white',
        borderBlockColor: 'white',
    },
    text_footer: {
        color: 'white',
        fontSize: 12,
        width: '80%',
        fontFamily: 'MyTaste_Regular',
    }
});

export default mainStyle;