import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Platform, ToastAndroid, Keyboard } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { sendOtp } from '../../api/service';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import KeyboardWrapper from '../../component/KeyboardWrapper';
import { ErrorHandler } from '../../utils/ErrorHanldler';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);
  

  const handleGetOtp = async () => {
    
    // 🔒 validation
    if (phone.length !== 10) {
       ErrorHandler.alert('Enter valid mobile number');
      return;
    }

    if (!checked) {
      ErrorHandler.alert('Please accept Terms & Conditions');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        phone: phone,
        countryCode: '+91',
      };

      const res = await sendOtp(payload);

      console.log('OTP Response:', res.data);
        ErrorHandler.success(res?.data.message);


      // ✅ Navigate to OTP screen
      navigation.navigate('OTP', { phoneNumber: payload.phone });

    } catch (error: any) {
      console.log('OTP Error:', error?.response.data);
      ErrorHandler.alert(error?.response.data.message);

    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardWrapper>
      <ImageBackground
        source={require('../../assets/images/onBoardingBg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>

          {/* Logo */}
          <Image
            source={require('../../assets/images/login_logo.png')}
            style={styles.logo}
          />

          {/* Title */}
          <Text style={styles.title}>Sign In</Text>

          {/* Label */}
          <Text style={styles.label}>Phone Number</Text>

          {/* Input Row */}
          <View style={styles.inputContainer}>

            {/* India Flag */}
            <Image
              source={require('../../assets/images/india.png')}
              style={styles.flag}
            />

            {/* Country Code */}
            <Text style={styles.code}>+91</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Input */}
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.checkboxContainer}>

            {/* Checkbox */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setChecked(!checked)}
              style={[
                styles.checkboxCustom,
                { backgroundColor: checked ? '#FF8C1A' : '#fff' }
              ]}
            >
              {checked && (
                <MaterialCommunityIcons name="check" size={16} color="#0D1227" />
              )}
            </TouchableOpacity>

            {/* Text */}
            <Text style={styles.checkboxText}>
              By proceeding, you agree to our{' '}
              <Text style={styles.link}>Terms & Conditions</Text>
            </Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, ]}
            onPress={handleGetOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Get OTP</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#0D1227"
                  style={{ marginLeft: 6 }}
                />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>

            {/* Google Button */}
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google Login')}>
              <Image
                source={require('../../assets/images/google.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Facebook Login')}>
              <Image
                source={require('../../assets/images/facebook.png')}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>

          </View>


        </View>
      </ImageBackground>
    </KeyboardWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: width * 0.05, // 5% of screen width
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.6,  // 50% of screen width
    height: width * 0.6, // keep square
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: height * 0.03, // 3% of screen height
  },
  title: {
    fontSize: 24, // responsive font
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
    marginTop: 20,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  code: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#555',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxText: {
    color: '#ccc',
    marginLeft: 10,
    flex: 1,
    fontSize: 12,
  },
  link: {
    color: '#FF8C1A',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FF8C1A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    color: '#0D1227',
    fontSize: 16,
    fontWeight: '700',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#555',
  },
  orText: {
    marginHorizontal: 10,
    color: '#ccc',
    fontSize: 14,
    fontWeight: '400',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderColor: "#4B557E"
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  checkboxCustom: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});