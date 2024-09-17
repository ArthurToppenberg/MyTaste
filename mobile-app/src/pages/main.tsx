import React from 'react';
import BottomNavigationBar from '../components/bottom_navigation_bar';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../tabs/home';
import Review from '../tabs/review';
import Explore from '../tabs/explore';
import Profile from '../tabs/profile';


const tabs = [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Review',
    component: Review,
  },
  {
    name: 'Explore',
    component: Explore,
  },
  {
    name: 'Profile',
    component: Profile,
  },
];

export default function Index() {
  return (
    <NavigationContainer>
      <BottomNavigationBar tabs={tabs} />
    </NavigationContainer>
  );
}
