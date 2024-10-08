import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import scrollStyle from '../styles/scrollStyle';

export interface ScrollItemHeaderPOIProps {
    info: string;
}

const ScrollItemHeaderPOI: React.FC<ScrollItemHeaderPOIProps> = ({ info }) => {
    return (
        <View style={scrollStyle.container_header_POI}>
            <Text style={scrollStyle.text_header_POI}>{info}</Text>
        </View>
    );
};

export default ScrollItemHeaderPOI;