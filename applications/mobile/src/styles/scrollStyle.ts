import { StyleSheet } from 'react-native';

const scrollStyle = StyleSheet.create({
    container_scroll: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        borderWidth: 1,
        borderBlockColor: 'white',
        overflow: 'hidden',
    },
    container_item: {
        alignItems: 'center',
        width: '100%',
        borderWidth: 0,
        borderBlockColor: 'white',
    },
    loading_container: {
        flex: 1,
        alignItems: 'center',
    },
    container_header: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        borderWidth: 0,
        borderColor: 'white',
        paddingTop: 8,
        flexDirection: 'row',
    },
    container_header_title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'MyTaste_Fancy',
        paddingStart: 10,
        paddingTop: 3,
    },
    container_header_indicator: {
        fontSize: 12,
        color: 'white',
        fontFamily: 'MyTaste_Fancy',
        paddingStart: 0,
        paddingTop: 5,
    },
    container_header_subtitle: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'MyTaste_Fancy',
        width: '50%',
        paddingStart: 11,
        paddingTop: 0,
    },
    container_header_info: {
        width: '44%',
        height: '100%',
        marginLeft: 10,
    },
    container_swipe: {
        width: '100%',
        height: '85%',
        backgroundColor: 'black',
        borderWidth: 0,
        borderColor: 'white',
        overflow: 'hidden',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
        padding: 10,
    },
    container_swipe_image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    container_header_POI: {
        maxHeight: 25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 8,
        marginRight: 5,
    },
    text_header_POI: {
        fontSize: 10,
        color: 'white',
        fontFamily: 'MyTaste_Fancy',
        paddingHorizontal: 10,
    },
});

export default scrollStyle;
