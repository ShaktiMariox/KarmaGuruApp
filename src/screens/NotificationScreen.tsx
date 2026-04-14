import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyle } from '../styles/commonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import ScreenWrapper from '../component/ScreenWrapper'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from '../utils/color'


const NotificationScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const tabs = [
  { id: 'all', label: 'All' },
  { id: 'kibil', label: 'KIBIL' },
  { id: 'forecast', label: 'Forecast' },
  { id: 'orders', label: 'Orders' },
  { id: 'chat', label: 'Chat' },
];

const notifications = [
  {
    id: '1',
    title: 'KIBIL Score Updated',
    description: 'Your score increased by 2 points! Great progress.',
    time: '2 hours ago',
    icon: 'chart-line',
    iconColor: '#F59E0B',
    isUnread: true,
  },
  {
    id: '2',
    title: 'Daily Forecast Ready',
    description: 'Check today’s predictions for all pillars.',
    time: '5 hours ago',
    icon: 'star-four-points',
    iconColor: '#00E0A4',
    isUnread: true,
  },
  {
    id: '3',
    title: 'Report Ready',
    description: 'Your Career & Finance report is now available for download.',
    time: 'Yesterday',
    icon: 'file-chart-outline',
    iconColor: '#FACC15',
    isUnread: false,
  },
  {
    id: '4',
    title: 'New Message from Astrologer',
    description: 'Pt. Rajesh Sharma sent you a follow-up message.',
    time: '2 days ago',
    icon: 'message-text-outline',
    iconColor: '#FB923C',
    isUnread: false,
  },
];
  const [activeTab, setActiveTab] = useState('all');

  
  return (
    <ImageBackground
          source={require('../assets/images/onBoardingBg.png')}
          style={commonStyle.background}
          resizeMode="cover"
        >
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: verticalScale(20) }}
            >
    <View style={commonStyle.forCastContentHeader}>
        <TouchableOpacity
                                   onPress={() => navigation.goBack()}
                                   style={commonStyle.foreCastContentHeaderLeft}
                               >
                                   <MaterialCommunityIcons
                                       name="arrow-left"
                                       size={moderateScale(22)}
                                       color="#fff"
                                   />
                               </TouchableOpacity>
       
                               {/* CENTER TITLE */}
                               <Text style={commonStyle.foreCastContentHeaderTitle}>
                                   Notification
                               </Text>
      
      </View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: verticalScale(16),
            }}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={[
                    styles.tab,
                    isActive && styles.activeTab,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      isActive && styles.activeTabText,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

        {notifications.map((item) => (
  <View
    key={item.id}
    style={[commonStyle.card, { marginTop: verticalScale(16) }]}
  >
    <View style={styles.cardRow}>
      
      {/* ICON */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${item.iconColor}20` }, // light bg
        ]}
      >
        <MaterialCommunityIcons
          name={item.icon as any}
          size={moderateScale(18)}
          color={item.iconColor}
        />
      </View>

      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* DOT (optional condition later) */}
       {item.isUnread && <View style={styles.dot} />}
      
    </View>
  </View>
))}

</ScrollView>
</SafeAreaView>
</ImageBackground>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({

  notificationHeaderLeft: {
    width: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  notificationHeaderTitle:{
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
   tab: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(18),
    borderRadius: moderateScale(12),
    backgroundColor: Color.primaryBgColor,
    marginRight: scale(10),
  },
  activeTab: {
    backgroundColor: Color.primarButtonBg,
  },
  tabText: {
    fontSize: moderateScale(14),
    color: '#7E7EA9',
  },
  activeTabText: {
    color: Color.activeTabTextColor,
    fontWeight: '600',
  },
  cardRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

iconContainer: {
  width: moderateScale(40),
  height: moderateScale(40),
  borderRadius: moderateScale(20),
  backgroundColor: Color.primaryBgColor,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: scale(12),
},

textContainer: {
  flex: 1,
},

title: {
  color: '#989DB5',
  fontSize: moderateScale(14),
  fontWeight: '600',
},

description: {
  color: '#B8B8D0',
  fontSize: moderateScale(12),
  marginTop: verticalScale(2),
  fontWeight:"400"
},

time: {
  color: '#7E7EA9',
  fontSize: moderateScale(11),
  marginTop: verticalScale(4),
},

dot: {
  width: moderateScale(6),
  height: moderateScale(6),
  borderRadius: moderateScale(3),
  backgroundColor: Color.primarButtonBg,
  marginLeft: scale(8),
},
})