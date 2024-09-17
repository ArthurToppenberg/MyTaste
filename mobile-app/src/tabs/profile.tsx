import React from 'react';
import { View } from 'react-native';

import styles from '../styles/default';
import SelectionBox from '../components/button_box';
import InfoBox from '../components/info_box';
import { useAuth } from '../utils/authenticationProvider';


export default function Profile() {
  const { logout, email } = useAuth();

  return (
    <View style={styles.containerParent}>
      <InfoBox title='Your information' text={`Email: ${email || '#DEVELOPER#'}`} />
      <SelectionBox buttons={[
        {
        title: "Logout",
        onPress: function (): void {
          logout();
        }
        },
      ]} />
    </View>
  );
}