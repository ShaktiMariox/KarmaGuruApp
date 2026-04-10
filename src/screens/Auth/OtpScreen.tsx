import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TextInput as RNTextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useRoute } from '@react-navigation/native';
import { verifyOtp } from '../../api/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErrorHandler } from '../../utils/ErrorHanldler';



const { width, height } = Dimensions.get('window');

const OtpScreen: React.FC = () => {
  const route = useRoute();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { phoneNumber } = route.params as { phoneNumber: string };

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  // Create refs for the 4 inputs
  const inputRefs = useRef<Array<RNTextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text) || text === '') {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if entered
      if (text !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Move back if deleted
      if (text === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');

    if (enteredOtp.length !== 4) {
      ErrorHandler.alert('Please enter valid OTP');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        phone: phoneNumber.replace('+91', ''),
        countryCode: '+91',
        otp: enteredOtp,
        deviceType: Platform.OS, // 'android' or 'ios'
      };


      const res = await verifyOtp(payload);
      const responseData = res?.data;
      console.log('Verify Response:', responseData);


      ErrorHandler.success(res?.message);



      if (responseData?.accessToken) {
        await AsyncStorage.setItem('token', responseData.accessToken);
      }
      const step = responseData?.user?.onboarding?.step;
      const stepValue = Number(step);
      await AsyncStorage.setItem('step', String(step)); 

      const routeMap: any = {
  1: 'EnterName',
  2: 'DateBirth',
  3: 'TimeBirth',
  4: 'BirthPlace',
  5: 'Home',
};

const nextScreen = routeMap[stepValue] || 'EnterName';

navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [{ name: nextScreen }],
  })
);


      // if (step === 1) {
      //   navigation.replace('EnterName');
      // } else if (step === 2) {
      //   navigation.replace('DateBirth');
      // } else if (step === 3) {
      //   navigation.replace('TimeBirth');
      // } else if (step === 4) {
      //   navigation.replace('BirthPlace'); // adjust if you have
      // } else if (step === 5) {
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: 'Home' }],
      //     })
      //   );
      // }



    } catch (error: any) {

      ErrorHandler.alert(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    navigation.replace('Login');
  }

  return (
    <ImageBackground
      source={require('../../assets/images/onBoardingBg.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.overlay}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../../assets/images/login_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>OTP</Text>
          <Text style={styles.subtitle}>Please enter OTP</Text>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                placeholder="X"
                placeholderTextColor="rgba(255,255,255,0.5)"
                onChangeText={(text) => handleChange(text, index)}
                caretHidden={true}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button]}
            onPress={handleVerifyOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Verify</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#0D1227"
                  style={{ marginLeft: 4 }}
                />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeNumberContainer} onPress={handleChangeNumber}>

            <Text style={styles.changeNumberText}>Change Number</Text>
            <Feather
              name="edit"       // Feather icon for edit
              size={18}
              color="#fff"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    justifyContent: 'flex-start',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: height * 0.2,
    marginTop: height * 0.08,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: width * 0.15,
    height: width * 0.15,
    borderWidth: 1,
    borderColor: '#4B557E',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
    backgroundColor: '#FF8C1A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0D1227',
    fontSize: 16,
    fontWeight: '700',
  },
  changeNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // space below the button
  },
  changeNumberText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});