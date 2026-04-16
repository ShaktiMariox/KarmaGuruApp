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
import { FontFamily } from '../../utils/fontFamily';


const { width, height } = Dimensions.get('window');

const OnboardingScreen2 = ({ navigation }: any) => {

  const handleNext = async () => {
    navigation.navigate('Onboarding3');
  }


  return (
    <View style={styles.container}>
      {/* GIF background */}
      <FastImage
        source={require('../../assets/images/onBoarding_logo2.gif')}
        style={StyleSheet.absoluteFill} // fill the whole parent
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Overlay content */}
      <View style={styles.overlay}>
        {/* Dynamic Logo */}
        <Text style={styles.title}>
          Discover Your{'\n'}Cosmic Blueprint
        </Text>

        <Text style={styles.desc}>Understand your birth chart, planets, and zodiac influence. </Text>
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

export default OnboardingScreen2;
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
    fontFamily:FontFamily.primaryFontFamily

  },
  desc: {
    marginTop: 10,
    fontSize: 16, // 4% of screen width
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: width * 0.1, // 10% padding
    fontFamily:FontFamily.secondaryFontFamily

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
    fontWeight: '500',
    fontFamily:FontFamily.secondaryFontFamily
    
  },
});