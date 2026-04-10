import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { onBoarding } from '../../api/service';
import { ErrorHandler } from '../../utils/ErrorHanldler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


const BirthPlaceScreen = ({ navigation }: any) => {
    const totalSteps = 5;
    const currentStep = 3;
    const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
    const [place, setPlace] = useState('');
    const [loading, setLoading] = useState(false);
    

   const handleNext = async () => {
  if (!place) {
    ErrorHandler.alert('Please enter birth place');
    return;
  }

 

  try {
    setLoading(true);

    const payload = {
      step: 4,
      data: {
        placeOfBirth: place,
        
      },
    };

    console.log('Payload:', payload);

    const response = await onBoarding(payload);

    console.log('API Response:', response);
            await AsyncStorage.setItem('step', '5');

    ErrorHandler.success(response?.message);

    navigation.navigate('Gender');
  } catch (error) {
    console.log('API Error:', error);
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
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
                            <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Birth Place</Text>

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
                            Tell us location so that we can make a more personalised prediction.
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>

                        {/* Label */}
                        <Text style={styles.inputLabel}>Enter Birth Place</Text>

                        {/* Input with icon */}
                        <View style={styles.inputWrapper}>
                            <MaterialCommunityIcons name="map-marker-outline" size={22} color="#fff" />
                            <TextInput
                                placeholder="Ghaziabad"
                                placeholderTextColor="#999"
                                style={styles.textInput}
                                value={place}
                                onChangeText={setPlace}
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

export default BirthPlaceScreen

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: verticalScale(50),
    paddingHorizontal: scale(20),
    position: 'absolute',
    top: 0,
    width: '100%',
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
    justifyContent: 'space-between',
    marginTop: verticalScale(120),
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },

  progressSegment: {
    flex: 1,
    height: verticalScale(6),
    borderRadius: scale(3),
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
    fontSize: moderateScale(14),
  },

  imageContainer: {
    marginTop: verticalScale(30),
    alignItems: 'center',
  },

  imageStyle: {
    width: scale(280),   // 🔥 removed fixed 400
    height: verticalScale(180),
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
    marginBottom: verticalScale(8),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
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
    fontWeight: '400',
  },

  nextButton: {
    marginTop: verticalScale(20),
    backgroundColor: '#FF8C1A',
    height: verticalScale(50),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  nextButtonText: {
    fontWeight: '700',
    fontSize: moderateScale(16),
    color: '#0D1227',
  },
});