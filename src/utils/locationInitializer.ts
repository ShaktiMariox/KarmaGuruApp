// LocationInitializer.tsx
import { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/store/onBoardingSlice';
import { requestLocationPermission } from './locationServices';

const LocationInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      const granted = await requestLocationPermission();

      if (!granted) return;

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          console.log('Location:', latitude, longitude);

          dispatch(setLocation({ lat: latitude, long: longitude }));
        },
        error => {
          console.log('ERROR:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
          showLocationDialog: true,
        }
      );
    };

    init();
  }, []);

  return null;
};

export default LocationInitializer;