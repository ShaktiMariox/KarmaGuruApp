import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { logout } from '../api/service';
import { ErrorHandler } from '../utils/ErrorHanldler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const logoutHandler = async () => {


    try {
      setLoading(true);



      const response = await logout();
      ErrorHandler.success(response?.message);
         await AsyncStorage.multiRemove(['token', 'step']);


      console.log('API Response:', response);


      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.log('API Error:', error);
      // alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <TouchableOpacity onPress={logoutHandler} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // center vertically
    alignItems: 'center',     // center horizontally
  },

  logoutButton: {
    backgroundColor: '#FF8C1A', // red background
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  logoutText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});