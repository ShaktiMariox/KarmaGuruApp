import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';


const { width, height } = Dimensions.get('window');

const OnboardingScreen3 = ({ navigation }: any) => {

  const handleNext = async () => {
    console.log('Navigating to Onboarding4');
    navigation.navigate('onboarding4');
  }


  return (
    <View style={styles.container}>
      {/* GIF background */}
      <FastImage
        source={require('../../assets/images/onBoarding_logo3.gif')}
        style={StyleSheet.absoluteFill} // fill the whole parent
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Overlay content */}
      <View style={styles.overlay}>
        {/* Dynamic Logo */}
        <Text style={styles.title}>
          Daily Guidance That Matters
        </Text>

        <Text style={styles.desc}>Get horoscope, muhurat, festivals, and divine insights—daily.</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color="#FF8C1A"
          style={{ marginLeft: 6 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: height * 0.2, // 20% from bottom
  },
  logo: {
    width: width * 0.6, // 60% of screen width
    height: width * 0.6, // keep it square
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24, // 6% of screen width
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  desc: {
    marginTop: 10,
    fontSize: 16, // 4% of screen width
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: width * 0.1, // 10% padding
  },
 button: {
   paddingVertical: height * 0.015,
  borderRadius: 10,
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom:20
  },
   buttonText: {
    color: '#FF8C1A',
    fontSize: 16,
    fontWeight: '500'
  },
});