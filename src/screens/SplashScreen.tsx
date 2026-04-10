import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Onboarding1: undefined;
  Login:undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {

 
useEffect(() => {
  checkOnboarding();
}, []);


const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

      const token = await AsyncStorage.getItem('token');
        const step = await AsyncStorage.getItem('step');
        const stepValue = Number(step);

       if (!hasSeenOnboarding) {
      navigation.replace('Onboarding1');
      return;
    }


 if (!token) {
    navigation.replace('Login');
    return;
  }
  const routeMap: any = {
    1: 'EnterName',
    2: 'DateBirth',
    3: 'TimeBirth',
    4: 'BirthPlace',
    5: 'Home',
  };

  const nextScreen = routeMap[stepValue] || 'EnterName';

  navigation.replace(nextScreen);

};

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash_logo.png')}
        style={styles.image}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
});