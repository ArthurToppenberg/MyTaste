import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerParent: {
        flex: 1,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    containerBottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#f5f5f5',
    },
    containerTop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
    },
    containerBox: {
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 24,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
    },
    image: {
        alignSelf: 'center',
        resizeMode: 'contain',
        height: '50%',
        marginBottom: 30,
    },       
});

export default styles;