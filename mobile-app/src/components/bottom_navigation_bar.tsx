import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Define the BottomNavigationProps type
type BottomNavigationProps = {
  name: string;
  component: React.ComponentType<any>;
};

const Tab = createBottomTabNavigator();

const BottomNavigationBar: React.FC<{ tabs: BottomNavigationProps[] }> = ({ tabs }) => {
  return (
    <Tab.Navigator>
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigationBar;
