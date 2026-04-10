import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { onBoarding } from '../../api/service';
import { ErrorHandler } from '../../utils/ErrorHanldler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';



const TimeBirthScreen = ({ navigation }: any) => {
    const totalSteps = 5;
    const currentStep = 2;
    const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

    const [time, setTime] = useState<Date | null>(null);
    const [show, setShow] = useState(false);
    const [unknownTime, setUnknownTime] = useState(false);
    const [loading, setLoading] = useState(false);
    


    const onChange = (event, selectedTime) => {
        // ❗ VERY IMPORTANT
        if (event.type === 'dismissed') {
            setShow(false);
            return;
        }

        if (selectedTime) {
            setTime(selectedTime);
        }

        setShow(false);
    };

    const handleNext = async () => {
    // If user doesn’t know exact time, skip validation
    if (!time && !unknownTime) {
        ErrorHandler.alert('Please select your time of birth or choose "Don’t know my exact time of birth"');
        return;
    }

    try {
              setLoading(true);

        const payload = {
            step: 3,
            data: {
                timeOfBirth: time
                    ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    : null,
                knowsExactBirthTime: !unknownTime,
            },
        };

        const response = await onBoarding(payload);
            await AsyncStorage.setItem('step', '4');

        ErrorHandler.success(response?.message);
        
        console.log('API Response:', response);

        // Navigate to next screen
        navigation.navigate('BirthPlace');
    } catch (error) {
        console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
};


    return (
        <ImageBackground
            source={require('../../assets/images/onBoardingBg.png')}
            style={styles.background}
        >
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>Time of Birth</Text>

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
                    Time is important for determining your sun sign, numerology and compatibility.
                </Text>
            </View>
            <View style={styles.bottomContainer}>

                <TouchableOpacity onPress={() => setShow(true)} style={styles.dobButton}>
                    <Text style={styles.dobText}>
                        {time
                            ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                            : 'Select time of birth'}
                    </Text>
                </TouchableOpacity>

                {/* Date Picker */}
                {show && (
                    <DateTimePicker
                        value={time || new Date()} // 👈 fallback only for picker
                        mode="time"
                        display="spinner"
                        onChange={onChange}
                    />
                )}
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setUnknownTime(!unknownTime)}
                >
                    <MaterialCommunityIcons
                        name={unknownTime ? "checkbox-marked" : "checkbox-blank-outline"}
                        size={20}
                        color="#fff"
                    />

                    <Text style={styles.checkboxText}>
                        Don’t know my exact time of birth
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.noteContainer}>
                    <Text style={styles.noteText}>
                        Note: Without time of birth, we can still achieve up to 80% accurate prediction
                    </Text>
                </TouchableOpacity>



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

        </ImageBackground>
    )
}

export default TimeBirthScreen

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
    width: scale(280),
    height: verticalScale(180),
  },

  imageText: {
    marginTop: verticalScale(20),

    color: 'white',
    fontSize: moderateScale(14),
    textAlign: 'center',
    paddingHorizontal: scale(20),
  },

  bottomContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    width: '100%',
    paddingHorizontal: scale(20),
  },

  dobButton: {
    borderWidth: 1,
    borderColor: "#4B557E",
    borderRadius: scale(14),
    paddingVertical: verticalScale(18),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
    width: '100%',
  },

  dobText: {
    color: 'white',
    fontSize: moderateScale(15),
    textAlign: 'center',
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },

  checkboxText: {
    color: 'white',
    marginLeft: scale(10),
    fontSize: moderateScale(13),
  },

  noteContainer: {
    backgroundColor: "#989DB5",
    borderRadius: scale(6),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },

  noteText: {
    color: '#0D1227',
    fontSize: moderateScale(10),
  },
});