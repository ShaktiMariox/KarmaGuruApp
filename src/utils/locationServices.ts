import { PermissionsAndroid, Platform, ToastAndroid, InteractionManager } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { store } from '../redux/store';
import { setLocation } from '../redux/store/onBoardingSlice';

export const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return;

  // Wait until app is attached to activity
  InteractionManager.runAfterInteractions(async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            console.log('Location obtained:', latitude, longitude);
            // Dispatch to Redux
            store.dispatch(setLocation({ lat: latitude, long: longitude }));
          },
          error => console.log('Location error:', error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        ToastAndroid.show("Location permission denied", ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('Permission request error:', err);
    }
  });
};