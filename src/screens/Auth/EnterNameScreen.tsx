import { ActivityIndicator, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { onBoarding } from '../../api/service';
import { ErrorHandler } from '../../utils/ErrorHanldler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const EnterNameScreen = ({ navigation }: any) => {
    const totalSteps = 5;
    const currentStep = 0;
    const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);


    const handleNext = async () => {
        if (!name.trim()) {
            ErrorHandler.alert('Please enter your name');
            return;
        }

        try {
            setLoading(true);

            const payload = {

                step: 1,
                data: {
                    name: name,
                },
            };

            const response = await onBoarding(payload);
            await AsyncStorage.setItem('step', '2');
            ErrorHandler.success(response?.message);
            console.log('API Response:', response);

            navigation.navigate('DateBirth');
        } catch (error) {
            console.log('API Error:', error);
            // alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (


        <ImageBackground
            source={require('../../assets/images/onBoardingBg.png')}
            style={styles.background}
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"

                >
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                       

                        <Text style={styles.title}>Your Name</Text>

                        {/* Placeholder to balance the layout */}
                        <View style={styles.arrowContainer} />
                    </View>
                    <View style={[styles.progressContainer, { justifyContent: 'flex-start', alignItems: 'center' }]}>
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressSegment,
                                    index <= currentStep ? styles.progressFilled : styles.progressEmpty,
                                ]}
                            />
                        ))}
                        <Text style={[styles.progressPercent, { marginLeft: 10 }]}>
                            {progressPercent}%
                        </Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/images/nameRashi.png')} // replace with your image
                            style={styles.imageStyle}
                            resizeMode="contain"
                        />
                        <Text style={styles.imageText}>
                            Tell us about yourself so that we can make a more personalised prediction.
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>

                        {/* Label */}
                        <Text style={styles.inputLabel}>Enter Name</Text>

                        {/* Input with icon */}
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="account" size={22} color="#fff" />
                            <TextInput
                                placeholder="Your name"
                                placeholderTextColor="#989DB5"
                                style={styles.textInput}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        {/* Next Button */}

                        <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={styles.nextButton}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.nextButtonText}>Next</Text>
                                    <MaterialCommunityIcons
                                        name="arrow-right"
                                        size={20}
                                        color="#0D1227"
                                        style={{ marginLeft: 8 }}
                                    />
                                </>
                            )}
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ImageBackground>

    )
}

export default EnterNameScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(50),
    paddingHorizontal: scale(20),
  },

  arrowContainer: {
    width: scale(28),
  },

  title: {
    color: 'white',
    fontSize: moderateScale(24),
    fontWeight: '600',
    textAlign: 'center',
  },

  progressContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },

  progressSegment: {
    flex: 1,
    height: verticalScale(6),
    borderRadius: moderateScale(3),
    marginHorizontal: scale(4),
  },

  progressFilled: {
    backgroundColor: '#FFCA96',
  },

  progressEmpty: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  progressPercent: {
    marginLeft: scale(10),
    color: 'white',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },

  imageContainer: {
    marginTop: verticalScale(25),
    alignItems: 'center',
  },

  imageStyle: {
    width: scale(280),   // 👈 responsive instead of 400
    height: verticalScale(160),
  },

  imageText: {
    marginTop: verticalScale(40),
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },

  bottomContainer: {
    marginTop: verticalScale(80),
    paddingHorizontal: scale(20),
  },

  inputLabel: {
    color: 'white',
    fontSize: moderateScale(14),
    marginBottom: verticalScale(6),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(14),
    paddingHorizontal: scale(12),
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: "#4B557E",
  },

  textInput: {
    flex: 1,
    marginLeft: scale(10),
    color: '#989DB5',
    fontSize: moderateScale(14),
  },

  nextButton: {
    marginTop: verticalScale(25),
    backgroundColor: '#FF8C1A',
    height: verticalScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  nextButtonText: {
    fontWeight: '700',
    fontSize: moderateScale(15),
    color: '#0D1227',
  },
});