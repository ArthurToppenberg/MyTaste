import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'MyTaste_Logo': require('../assets/fonts/Agbalumo-Regular.ttf'),
    'MyTaste_Regular': require('../assets/fonts/FiraSansCondensed-Regular.ttf'),
    'MyTaste_Fancy': require('../assets/fonts/Adamina-Regular.ttf'),
  });
};

//../assets/fonts/Agbalumo-Regular.ttf