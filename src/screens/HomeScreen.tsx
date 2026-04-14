import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

import {
  moderateScale,
  verticalScale,
  scale,
} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Circle } from 'react-native-svg';
import ProgressCircle from '../component/ProgressCircle';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyle } from '../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import { AstrologerCard } from '../component/AstrologerCard';
import LiveAstrologerCard from '../component/LiveAstrologerCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';



const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  

  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const score = 78;
  const progress = score / 100;
  const strokeDashoffset = circumference - circumference * progress;


const quickActionsData = [
  { title: 'Ask AI', icon: 'message-outline', color: '#FF7A00' },
  { title: 'Start Chant', icon: 'waveform', color: '#00E5A0' },
  { title: 'Donate', icon: 'heart-outline', color: '#FF7A00' },
  { title: 'Astrologer', icon: 'video-outline', color: '#FF7A00' },
  { title: 'Compatibility', icon: 'calendar-outline', color: '#FF7A00' },
  { title: 'Scan Vastu', icon: 'scan-helper', color: '#00E5A0' },
  { title: 'Palm Reading', icon: 'hand-back-right-outline', color: '#FF7A00' },
  { title: 'Horoscope', icon: 'hand-back-right', color: '#FF7A00' },
];

const astrologerData = [
  {
    id: '1',
    name: 'Astro Ragini',
    skill: 'Vedic, Palmistry',
    rating: 4.5,
    image: require('../assets/images/astroImage.png'),
  },
  {
    id: '2',
    name: 'Astro Neha',
    skill: 'Tarot, Numerology',
    rating: 4.7,
    image: require('../assets/images/astroImage.png'),
  },
  {
    id: '3',
    name: 'Astro Amit',
    skill: 'Vastu, Astrology',
    rating: 4.3,
    image: require('../assets/images/astroImage.png'),
  },
];

const liveAstroData = [
  {
    id: '1',
    name: 'Guru Jadhavan',
    skill: 'Vedic, Numerology',
    viewers: 234,
    image: require('../assets/images/astroImage.png'),
  },
  {
    id: '2',
    name: 'Astro Meera',
    skill: 'Tarot, Vastu',
    viewers: 120,
    image: require('../assets/images/astroImage.png'),
  },
];

const handleKundli = () =>{
  navigation.navigate("MyKundli")
}
const handleViewAllForecast = () =>{
  navigation.navigate("Forecast")
}


  return (

    <ImageBackground
      source={require('../assets/images/onBoardingBg.png')}
      style={commonStyle.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: verticalScale(80) }}
        >
          {/* HEADER */}

          <View style={styles.header}>

            {/* LEFT SIDE */}
            <View style={styles.leftHeader}>



              <View style={styles.textSection}>
                <Text style={styles.helloText}>Hello, Nitin!</Text>
                <Text style={styles.dateText}>
                  February 15, 2023 - 09:41 AM
                </Text>
              </View>

            </View>

            {/* RIGHT SIDE */}
            <View style={styles.rightHeader}>

              <TouchableOpacity onPress={()=>navigation.navigate("Wallet")} style={styles.walletPill}>
                <MaterialCommunityIcons
                  name="wallet-outline"
                  size={16}
                  color="#111734"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.walletText}>₹100</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Notification")} style={styles.iconBtn}>
                <MaterialCommunityIcons
                  name="bell"
                  size={styles.icon.width}
                  color="#fff"
                  style={styles.icon}
                />
              </TouchableOpacity>

              <View style={styles.avatar}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#4B557E" />
              </View>

            </View>

          </View>

          <View style={styles.aiInput}>

            {/* Left icon */}
            <View style={styles.aiInputIcon}>
              <MaterialCommunityIcons
                name="creation"
                size={20}
                color="#9AA0FF"
              />
            </View>

            {/* Input */}
            <TextInput
              placeholder="Tell me about my future..."
              placeholderTextColor="#8A8FA3"
              style={styles.input}
            />

            {/* Send button */}
            <TouchableOpacity style={styles.sendBtn}>
              <MaterialCommunityIcons name="arrow-right" size={20} color="#FF7A18" />
            </TouchableOpacity>

          </View>

          <View style={styles.karmaScoreContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.scoreTitle}>
                Karma Score
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.subText}>
                  Why it changed
                </Text>

                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={18}
                  color="#999"
                  style={{ marginLeft: 6 }}
                />
              </View>
            </View>

            <Text style={styles.updatedTime}>
              Updated 2 hours ago
            </Text>

            <View style={styles.animateScoreContainer}>
              {/* Left Circular Score */}
              <View style={styles.circleContainer}>
                <Svg width={100} height={100}>
                  <Circle
                    stroke="#2E2E4D"
                    fill="none"
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={strokeWidth}
                  />
                  <Circle
                    stroke="#F4B400"
                    fill="none"
                    cx="50"
                    cy="50"
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="50,50"
                  />
                </Svg>

                <View style={styles.scoreText}>
                  <Text style={styles.scoreValue}>78</Text>
                  <Text style={styles.scoreLabel}>KIBIL Score</Text>
                </View>
              </View>

              {/* Right Content */}
              <View style={styles.rightSection}>

                {/* TOP ROW */}
                <View style={styles.rowBetween}>
                  <View>
                    <Text style={styles.confidenceLabel}>Confidence</Text>
                    <Text style={styles.confidenceValue}>92%</Text>
                  </View>

                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color="#FF8C00"
                  />
                </View>

                {/* BUTTON AT BOTTOM RIGHT */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cosmic Weather</Text>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color="#FF8C00"
                      style={{ marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>

              </View>
            </View>

          </View>

          <View style={styles.foreCastContainer}>

            {/* HEADER */}
            <View style={styles.foreCastHeader}>
              <Text style={styles.title}>Forecast Highlights</Text>
              <TouchableOpacity onPress={handleViewAllForecast}>
              <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
              
              
            </View>

            {/* TABS */}
            <View style={styles.tabs}>
              <Text style={[styles.tab, styles.activeTab]}>Day</Text>
              <Text style={styles.tab}>Week</Text>
              <Text style={styles.tab}>Month</Text>
            </View>

            {/* CARDS */}
            <View style={styles.row}>
              <ProgressCircle percent={20} color="#FF3B30" label="Career" />
              <ProgressCircle percent={65} color="#FFD60A" label="Love" />
              <ProgressCircle percent={95} color="#32D74B" label="Health" />
            </View>

            {/* BUTTON */}
            <TouchableOpacity onPress={handleKundli} style={styles.myKumdliBtn}>
              <Text style={styles.myKundliButtonText}>My Kundli</Text>
            </TouchableOpacity>

          </View>

          {/* HEADER */}
          <Text style={[styles.title, { marginTop: verticalScale(20) }]}>Pending Verification</Text>


          <View style={styles.verificationContainer}>

            {/* Card */}
            <View style={commonStyle.card}>

              {/* Top Row */}
              <View style={commonStyle.cardRow}>

                {/* Icon */}
                <View style={styles.verificationIconWrapper}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    size={moderateScale(16)}
                    color="#FF8C00"
                  />
                </View>

                {/* Text */}
                <View style={styles.verificationTextContainer}>
                  <Text style={commonStyle.cardtitle1}>
                    Meditation - 30 min
                  </Text>
                  <Text style={commonStyle.cardSubTitle1}>
                    Awaiting proof
                  </Text>
                </View>

                {/* Status Badge */}
                <View style={styles.verificationStatusBadge}>
                  <Text style={styles.verificationStatusText}>
                    Pending
                  </Text>
                </View>

              </View>

              {/* Button */}
              <TouchableOpacity style={commonStyle.bgLessButton}>
                <Text style={commonStyle.bgLessButtonTxt}>Upload Proof</Text>
              </TouchableOpacity>

            </View>
          </View>




          <View style={[commonStyle.card, { marginTop: verticalScale(14) }]}>

            {/* Top Row */}
            <View style={commonStyle.cardRow}>

              {/* Icon */}
              <View style={[styles.verificationIconWrapper2]}>
                <FastImage
                  source={require('../assets/images/handIcon.png')}
                  style={{
                    width: scale(24),
                    height: scale(24)
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>

              {/* Text */}
              <View style={styles.verificationTextContainer}>
                <Text style={[commonStyle.cardtitle1, { fontSize: moderateScale(16), color: "#fff" }]}>
                  Karma Donation
                </Text>
                <Text style={commonStyle.cardSubTitle1}>
                  Support causes. Improve your karma.
                </Text>
              </View>

              {/* Status Badge */}


            </View>

            {/* Button */}
            <TouchableOpacity style={[commonStyle.bgLessButton, { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: scale(10) }]}>
              <MaterialCommunityIcons
                name="gift"
                size={20}
                color="#FF8C00"
              />

              <Text style={commonStyle.bgLessButtonTxt}>Donate Karma</Text>
            </TouchableOpacity>

          </View>

          <Text style={[styles.title, { marginTop: verticalScale(20) }]}>Daily Karma Mission</Text>


          <View style={styles.verificationContainer}>

            {/* Card */}
            <View style={commonStyle.card}>

              {/* Top Row */}
              <View style={commonStyle.cardRow}>

                {/* Icon */}
                <View style={[styles.verificationIconWrapper, { backgroundColor: "#FF9F2A" }]}>
                  <MaterialCommunityIcons
                    name="om"
                    size={moderateScale(20)}
                    color="#000"
                  />
                </View>

                {/* Text */}
                <View style={[styles.verificationTextContainer]}>
                  <Text style={[commonStyle.cardtitle1, { fontSize: moderateScale(16), color: "#fff" }]}>
                    Chant Om 108 times
                  </Text>
                  <Text style={commonStyle.cardSubTitle1}>
                    Reward: +5 Karma Points
                  </Text>
                </View>

                {/* Status Badge */}


              </View>

              {/* Button */}
              <TouchableOpacity style={commonStyle.bgLessButton}>
                <Text style={commonStyle.bgLessButtonTxt}>Start Now</Text>
              </TouchableOpacity>

            </View>
          </View>

            <Text style={[styles.title, { marginTop: verticalScale(20) }]}>Kundali</Text>

            <View style={styles.featureContainer}>

      {/* Card 1 */}
      <View style={styles.featureCard}>
        <View style={styles.featureIconWrapper}>
          <MaterialCommunityIcons
            name="star-outline"
            size={moderateScale(18)}
            color="#FF8C00"
          />
        </View>

        <Text style={[styles.featureTitle,{fontWeight:"500"}]}>Generate Kundali</Text>
        <Text style={styles.featureSubtitle}>
          AI-powered birth chart
        </Text>
      </View>

      {/* Card 2 */}
      <View style={styles.featureCard}>
        <View style={styles.featureIconWrapper}>
          <MaterialCommunityIcons
            name="account-group-outline"
            size={moderateScale(18)}
            color="#00D4AA"
          />
        </View>

        <Text style={styles.featureTitle}>Match Kundali</Text>
        <Text style={styles.featureSubtitle}>
          Compatibility insights
        </Text>
      </View>

    </View>
            <Text style={[styles.title, { marginTop: verticalScale(20) }]}>Quick Actions</Text>

             <View style={styles.quickActionsContainer}>
      <View style={styles.quickActionsGrid}>
        {quickActionsData.map((item, index) => (
          <TouchableOpacity key={index} style={styles.quickActionCard}>
            
            {/* ICON */}
            <View style={styles.quickActionIconWrapper}>
              <MaterialCommunityIcons
                name={item.icon}
                size={moderateScale(22)}
                color={item.color}  
              />
            </View>

            {/* TITLE */}
            <Text style={styles.quickActionText}>
              {item.title}
            </Text>

          </TouchableOpacity>
        ))}
      </View>
    </View>

     <View style={styles.adviserHeader}>
              <Text style={styles.title}>Advisers</Text>
              <Text style={[styles.viewAll,{fontWeight:"400", fontSize:moderateScale(12), color:"#D4A017"}]}>See All</Text>
            </View>
             <FlatList
        data={astrologerData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <AstrologerCard item={item} />
        )}
      />

      <View style={styles.adviserHeader}>
              <Text style={styles.title}>Live Astrologers 🔴</Text>
              <Text style={[styles.viewAll,{fontWeight:"400", fontSize:moderateScale(12), color:"#D4A017"}]}>See All</Text>
            </View>

            <FlatList
  data={liveAstroData}
  horizontal
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{  }}
  renderItem={({ item }) => (
    <LiveAstrologerCard item={item} />
  )}
/>


      

            














          {/* CONTENT */}
          {/* <View style={styles.content}>
         
        </View> */}

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default HomeScreen

const styles = StyleSheet.create({


  

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4B557E',
    backgroundColor: 'transparent',
  },

  textSection: {
    flexDirection: 'column',
  },

  helloText: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#fff',
  },

  dateText: {
    fontSize: moderateScale(10),
    color: '#aaa',
    marginTop: verticalScale(2),
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletPill: {
    backgroundColor: '#ff8c00',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },

  walletText: {
    color: '#111734', // ✅ fixed typo
    fontWeight: '500',
    fontSize: moderateScale(16),
  },

  iconBtn: {
    padding: moderateScale(6),
  },

  icon: {
    width: scale(20),
    height: scale(20),
    tintColor: '#fff',
  },

  smallProfile: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
  },

  aiInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1F36',
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(10),
    borderWidth: 1,
    borderColor: '#3A3F66',
  },

  aiInputIcon: {
    backgroundColor: "#0D1227",
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    color: '#fff', // ✅ better visibility
    marginHorizontal: scale(10),
    fontSize: moderateScale(12),
    fontWeight: '400',
  },

  sendBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF7A18',
  },

  karmaScoreContainer: {
    borderRadius: moderateScale(12),
    backgroundColor: '#1B1F36',
    borderWidth: 1,
    borderColor: '#3A3F66',
    padding: moderateScale(16),
    marginTop: verticalScale(20),
  },

  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  scoreTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#fff',
  },

  subText: {
    color: "#FF7A00",
    fontWeight: '500',
    fontSize: moderateScale(12),
  },

  updatedTime: {
    fontWeight: "400",
    color: "#989DB5",
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
  },

  animateScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  rightSection: {
    flex: 1,
    marginLeft: scale(16),
    justifyContent: 'space-between',
    height: verticalScale(100),
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonRow: {
    alignItems: 'flex-end',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF8C00',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(8),
  },

  buttonText: {
    color: '#FF8C00',
    fontSize: moderateScale(10),
  },

  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    position: 'absolute',
    alignItems: 'center',
  },

  scoreValue: {
    color: '#fff',
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },

  scoreLabel: {
    color: '#7E7EA9',
    fontSize: moderateScale(10),
  },

  confidenceLabel: {
    color: '#989DB5',
    fontSize: moderateScale(14),
  },

  confidenceValue: {
    color: '#00C48C',
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginVertical: verticalScale(4),
  },
  foreCastContainer: {
    // padding: 16,
  },

  foreCastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(20),
  },

  title: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  viewAll: {
    color: '#fff',
    fontSize: moderateScale(14),
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(16),
  },

  tab: {
    color: '#888',
    fontSize: moderateScale(14),
  },

  activeTab: {
    color: '#FF8C1A',
    fontWeight: '600',
    borderBottomColor: '#FF8C1A',
    borderBottomWidth: moderateScale(2),
    paddingBottom: verticalScale(4),
    paddingHorizontal: scale(20), // 🔥 reduced from 30 (better responsiveness)
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(16),
  },

  card: {
    width: scale(100),
    height: verticalScale(130),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,20,50,0.6)',
  },

  ForeCastbutton: {
    backgroundColor: '#7A3E00',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  myKundliButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },

  myKumdliBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF8C1A',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(10),
    backgroundColor: '#6B3B0B',
    justifyContent: 'center',
  },

  verificationContainer: {
    marginTop: verticalScale(20),
  },



  verificationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },

  verificationIconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#1C2045',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  verificationIconWrapper2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
    width: scale(45),
    height: scale(45),
    backgroundColor: "#D4A017",
    borderRadius: scale(10)


  },

  verificationTextContainer: {
    flex: 1,
  },

  verificationTitle: {
    color: '#C7C9E0',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },

  verificationSubtitle: {
    color: '#6E739B',
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
  },

  verificationStatusBadge: {
    backgroundColor: '#FFB0201A',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
  },

  verificationStatusText: {
    color: '#D4A017',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  uploadProofButton: {
    borderWidth: 1.5,
    borderColor: '#FF8C00',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },

  uploadProofText: {
    color: '#FF8C00',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

    featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
    gap: scale(10), // 🔥 spacing between cards
  },

  featureCard: {
    flex: 1,
    backgroundColor: '#0F1230',
    borderRadius: moderateScale(14),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: '#2A2E5B',
  },

  featureIconWrapper: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: '#1C2045',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },

  featureTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  featureSubtitle: {
    color: '#B8B8D0',
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },

   quickActionsContainer: {
    marginTop: verticalScale(20),
    // paddingHorizontal: scale(10),
  },

  // 🔥 GRID LAYOUT
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:"flex-start",
    gap:scale(15)
    // justifyContent: 'space-between',
  },

  // 🔥 CARD
  quickActionCard: {
    width: '30%',
    height: verticalScale(90),
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    backgroundColor: 'rgba(20,20,50,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(14),
      // marginRight: '3.3%',   // 👈 spacing manually

  },

  // 🔥 ICON WRAPPER
  quickActionIconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },

  // 🔥 TEXT
  quickActionText: {
    color: '#B8B8D0',
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontWeight:"400"
  },
    adviserHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(20),
  },
  




});
