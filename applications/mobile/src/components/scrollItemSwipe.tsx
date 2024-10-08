import React from 'react';
import { View, Image } from 'react-native';

import scrollStyle from '../styles/scrollStyle';

export interface ScrollItemSwipeProps {
    imageSrc: string;
}

const ScrollItemSwipe: React.FC<ScrollItemSwipeProps> = ({ imageSrc }) => {
    return (
        <View style={[scrollStyle.container_swipe]}>
            <Image
                source={{ uri: imageSrc }}
                style={scrollStyle.container_swipe_image}
            />
        </View>
    );
};

export default ScrollItemSwipe;