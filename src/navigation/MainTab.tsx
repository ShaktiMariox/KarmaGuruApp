import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from '../screens/ProfileScreen';
import { View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type RootTabParamList = {
  Home: undefined;
  Karma: undefined;
  AI: undefined;
  Advisers: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Tabs() {
    const insets = useSafeAreaInsets();

  return (
 <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,

    tabBarIcon: ({ color, size, focused }) => {
      let iconName: string = '';

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Karma') {
        iconName = focused ? 'lightning-bolt' : 'lightning-bolt-outline';
      } else if (route.name === 'AI') {
        iconName = 'sparkles';
      } else if (route.name === 'Advisers') {
        iconName = focused ? 'account-group' : 'account-group-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'account' : 'account-outline';
      }

      return (
        <MaterialCommunityIcons
          name={iconName}
          size={route.name === 'AI' ? moderateScale(28) : size}
          color={color}
        />
      );
    },

    tabBarActiveTintColor: '#FF8C00',
    tabBarInactiveTintColor: '#aaa',

    tabBarStyle: {
      backgroundColor: '#0B0F1A',
      height: verticalScale(60) + insets.bottom, // ✅ responsive height
      borderTopWidth: 1,
      borderTopColor: '#1F2937',
      position: 'absolute',
      overflow: 'visible',
    },

    tabBarLabelStyle: {
      fontSize: moderateScale(12),
      marginBottom: verticalScale(5),
    },
  })}
>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Karma" component={HomeScreen} />
     <Tab.Screen
  name="AI"
  component={HomeScreen}
  options={{
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          position: 'absolute',
          top: -verticalScale(25), // 👈 responsive lift

          width: scale(40),
          height: scale(40),
          borderRadius: scale(32.5),

          backgroundColor: '#FF8C00',
          justifyContent: 'center',
          alignItems: 'center',

        }}
      >
        <MaterialCommunityIcons
          name="creation"
          size={moderateScale(28)}
          color="#000"
        />
      </View>
    ),
    tabBarLabel: 'AI',
  }}
/>
      <Tab.Screen name="Advisers" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}