import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';

import OnboardingScreen from './src/screens/OnBoardingScreen/OnBoardingScreen1';
import OnboardingScreen1 from './src/screens/OnBoardingScreen/OnBoardingScreen1';
import OnboardingScreen2 from './src/screens/OnBoardingScreen/OnBoardingScreen2';
import OnboardingScreen3 from './src/screens/OnBoardingScreen/OnBoardingScreen3';
import OnboardingScreen4 from './src/screens/OnBoardingScreen/OnBoardingScreen4';
import LoginScreen from './src/screens/Auth/LoginScreen';
import OtpScreen from './src/screens/Auth/OtpScreen';
import EnterNameScreen from './src/screens/Auth/EnterNameScreen';
import DateBirthScreen from './src/screens/Auth/DateBirthScreen';
import TimeBirthScreen from './src/screens/Auth/TimeBirthScreen';
import BirthPlaceScreen from './src/screens/Auth/BirthPlaceScreen';
import GenderScreen from './src/screens/Auth/GenderScreen';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform, ToastAndroid } from 'react-native';
import { setLocation } from './src/redux/store/onBoardingSlice';
import { requestLocationPermission } from './src/utils/locationServices';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NetworkProvider } from './src/context/NetworkProvider';
import GlobalModal from './src/component/GlobalModal';
import Tabs from './src/navigation/MainTab';
import MyKundliScreen from './src/screens/MyKundliScreen';
import ForeCastScreen from './src/screens/ForeCastScreen';
import CareerGrowthScreen from './src/screens/CareerGrowthScreen';
import LoveRelationScreen from './src/screens/LoveRelationScreen';
import StartRemedyScreen from './src/screens/StartRemedyScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import WalletScreen from './src/screens/WalletScreen';


export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  onboarding4: undefined;
  EnterName: undefined;
  DateBirth: undefined;
  TimeBirth: undefined;
  BirthPlace: undefined;
  Gender: undefined;
  MainTabs:undefined;
  MyKundli:undefined;
  Forecast:undefined;
  CarrerGrowth:undefined;
  LoveRelation:undefined;
  StartRemedy:undefined;
  Notification:undefined;
  Wallet:undefined;

  Login: undefined;
  OTP?: { phoneNumber: string }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding1" component={OnboardingScreen1}


        />
        <Stack.Screen name="Onboarding2" component={OnboardingScreen2}
        />
        <Stack.Screen name="Onboarding3" component={OnboardingScreen3}
        />
        <Stack.Screen name="onboarding4" component={OnboardingScreen4}

        />
        <Stack.Screen name="MainTabs" component={Tabs} />
        <Stack.Screen name="Login" component={LoginScreen}
        />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="EnterName" component={EnterNameScreen} />
        <Stack.Screen name="DateBirth" component={DateBirthScreen} />
        <Stack.Screen name="TimeBirth" component={TimeBirthScreen} />
        <Stack.Screen name="BirthPlace" component={BirthPlaceScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="MyKundli" component={MyKundliScreen} />
        <Stack.Screen name="Forecast" component={ForeCastScreen} />
        <Stack.Screen name="CarrerGrowth" component={CareerGrowthScreen} />
        <Stack.Screen name="LoveRelation" component={LoveRelationScreen} />
        <Stack.Screen name="StartRemedy" component={StartRemedyScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />



       





      </Stack.Navigator>
    </NavigationContainer>
  )

}

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NetworkProvider>
          <>

            <AppNavigator />
            <GlobalModal />
          </>
        </NetworkProvider>
      </SafeAreaProvider>

    </Provider>


  );
};

export default App;