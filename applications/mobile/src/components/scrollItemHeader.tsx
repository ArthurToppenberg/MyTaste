import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import scrollStyle from '../styles/scrollStyle';

import ScrollItemHeaderPOI from './scrollItemHeaderPOI';

export interface ScrollItemHeaderProps {
    title: string;
    subtitle: string;
    indicator: string;
}

const ScrollItemHeader: React.FC<ScrollItemHeaderProps> = ({ title, subtitle, indicator }) => {
    return (
        <View style={scrollStyle.container_header}>
            <View style={{ flexDirection: 'column', width: "50%"}}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={scrollStyle.container_header_title}>{title}</Text>
                    <Text style={scrollStyle.container_header_indicator}> - {indicator}</Text>
                </View>
                <Text style={scrollStyle.container_header_subtitle}>{subtitle}</Text>
            </View>
            <View style={{ 
                flexDirection: 'row', 
                width: "50%", 
                justifyContent: "flex-end",
                alignItems: "flex-start",
                paddingRight: 8
                }}>
                <ScrollItemHeaderPOI info='250m'/>
                <ScrollItemHeaderPOI info='25%'/>
            </View>
        </View>
    );
};

export default ScrollItemHeader;