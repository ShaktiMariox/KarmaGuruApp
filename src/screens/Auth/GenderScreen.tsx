import { ActivityIndicator, Image, ImageBackground, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { completeOnboarding, onBoarding } from '../../api/service';
import { ErrorHandler } from '../../utils/ErrorHanldler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { FontFamily } from '../../utils/fontFamily';


const GenderScreen = ({ navigation }: any) => {
    const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
    const [otherGender, setOtherGender] = useState('');
    const totalSteps = 5;
    const currentStep = 4;
    const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);
    const [loading, setLoading] = useState(false);


    const handleNext = async () => {
        const finalGender = gender || otherGender;

        if (!finalGender) {
            ErrorHandler.alert('Please select gender');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                step: 5,
                data: {
                    gender: finalGender,
                },
            };

            console.log('Payload:', payload);

            const response = await onBoarding(payload);
            const completedOnboarding = await completeOnboarding();

            console.log('API Response:', response);
            console.log('API Response:', completedOnboarding);

            ErrorHandler.success(response?.message);

           navigation.reset({
  index: 0,
  routes: [{ name: 'MainTabs' }],
});

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
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color="white" />
                </TouchableOpacity>

                <Text style={styles.title}>Your Gender</Text>

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
                    It will reveal the balance of your masculine and feminine energy.
                </Text>
            </View>
            <View style={styles.bottomContainer}>

                <View style={styles.genderContainer}>

                    {/* Male */}
                    <TouchableOpacity
                        style={[
                            styles.genderBox,
                            gender === 'male' && styles.genderSelected
                        ]}
                        onPress={() => setGender('male')}
                    >
                        <MaterialCommunityIcons name="gender-male" size={22} color="#fff" />
                        <Text style={styles.genderText}>Male</Text>
                    </TouchableOpacity>

                    {/* Female */}
                    <TouchableOpacity
                        style={[
                            styles.genderBox,
                            gender === 'female' && styles.genderSelected
                        ]}
                        onPress={() => setGender('female')}
                    >
                        <MaterialCommunityIcons name="gender-female" size={22} color="#fff" />
                        <Text style={styles.genderText}>Female</Text>
                    </TouchableOpacity>

                </View>

                {/* Label */}

                {/* Input with icon */}
                 <TouchableOpacity
                        style={[
                            styles.otherGenderBox,                            
                            gender === 'other' && styles.genderSelected
                        ]}
                        onPress={() => setGender('other')}
                    >
                        <MaterialCommunityIcons name="gender-transgender" size={22} color="#fff" />
                        <Text style={styles.genderText}>Other</Text>
                    </TouchableOpacity>

                {/* Next Button */}
                <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={styles.nextButton}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Text style={styles.nextButtonText}>Submit</Text>
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

export default GenderScreen

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
    fontFamily: FontFamily.primaryFontFamily

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
    fontFamily: FontFamily.secondaryFontFamily

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
    fontFamily: FontFamily.secondaryFontFamily

  },

  bottomContainer: {
    position: 'absolute',
    bottom: verticalScale(40),
    width: '100%',
    paddingHorizontal: scale(20),
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },

  genderBox: {
    flex: 1,
    height: verticalScale(70),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#4B557E',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(5),
    backgroundColor: 'rgba(255,255,255,0.02)',
  },

  otherGenderBox: {
    height: verticalScale(70),
    borderRadius: scale(16),
    borderWidth: 1,
    borderColor: '#4B557E',
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(20),
    paddingHorizontal: scale(16),

    // 🔥 important for left alignment
    justifyContent: 'flex-start',
  },

  genderSelected: {
    borderColor: '#A855F7',
    elevation: 6,
  },

  genderText: {
    color: 'white',
    marginTop: verticalScale(6),
    fontSize: moderateScale(14),
    fontFamily: FontFamily.secondaryFontFamily

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
    fontFamily: FontFamily.secondaryFontFamily

  },
});