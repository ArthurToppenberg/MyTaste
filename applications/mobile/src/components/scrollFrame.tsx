import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';

import scrollStyle from '../styles/scrollStyle';
import type { ScrollItemProps } from './scrollItem';
import ScrollItem from './scrollItem';

interface ScrollFrameProps {
    //items: ScrollItemProps[];
}

const ScrollFrame: React.FC<ScrollFrameProps> = ({ }) => {
    const items: ScrollItemProps[] = [
        {
            itemHeaderProps:
            {
                title: 'Bistro Royale',
                subtitle: 'Kongens nytorv',
                indicator: '$$$'
            },
            itemSwipeProps:
            {
                imageSrc: 'https://interiordesign.net/wp-content/uploads/2023/10/Interior-Design-Run-for-the-Hills-idx231001_roundup35.jpg'
            }
        },
        {
            itemHeaderProps:
            {
                title: 'Frankies Pizza',
                subtitle: 'Sortedam Dossering',
                indicator: '$$'
            },
            itemSwipeProps:
            {
                imageSrc: 'https://www.hot-dinners.com/images/stories/blog/2023/larrys/larrysnight.jpg'
            }
        },
    ];

    const [scrollViewHeight, setScrollViewHeight] = useState<number | null>(null);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setScrollViewHeight(height);
    };

    return (
        <ScrollView
            style={scrollStyle.container_scroll}
            onLayout={handleLayout}
            snapToInterval={scrollViewHeight ?? 0}  // Snap to the height of each item
            decelerationRate="fast"  // Smooth snap effect
            showsVerticalScrollIndicator={false}  // Hide scroll indicator for cleaner UI
        >
            {scrollViewHeight !== null ? (
                items.map((item, index) => (
                    <ScrollItem key={index} height={scrollViewHeight} itemHeaderProps={item.itemHeaderProps} itemSwipeProps={item.itemSwipeProps} />
                ))
            ) : (
                <View style={scrollStyle.loading_container}>
                    <Text>Loading...</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default ScrollFrame;
