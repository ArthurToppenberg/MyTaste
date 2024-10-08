import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import scrollStyle from '../styles/scrollStyle';

import ScrollItemHeader from './scrollItemHeader';
import type { ScrollItemHeaderProps } from './scrollItemHeader';

import ScrollItemSwipe from './scrollItemSwipe';
import type { ScrollItemSwipeProps } from './scrollItemSwipe';

export interface ScrollItemProps {
    height?: number;
    itemHeaderProps: ScrollItemHeaderProps;
    itemSwipeProps: ScrollItemSwipeProps;
}

const ScrollItem: React.FC<ScrollItemProps> = ({height, itemHeaderProps, itemSwipeProps}) => {
    return (
        <View style={[scrollStyle.container_item, { height: height }]}>
           <ScrollItemHeader {...itemHeaderProps}/>
           <ScrollItemSwipe {...itemSwipeProps}/>
        </View>
    );
};

export default ScrollItem;