import { ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyle } from '../styles/commonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import ForecastTabs from '../component/ForeCastTab'
import Graph from '../component/GraphCard'


const ForeCastScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState('Day');
  const tabs = ['Day', 'Week', 'Month', 'Quarter', 'Year'];

  const [showWhyForecastModal, setShowWhyForecastModal] = useState(false);



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
          <View style={styles.forecastHeaderContainer}>

            {/* LEFT BACK BUTTON */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.forecastHeaderLeft}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={moderateScale(22)}
                color="#fff"
              />
            </TouchableOpacity>

            {/* TITLE */}
            <Text style={styles.forecastHeaderTitle}>
              Your Forecast
            </Text>

            {/* RIGHT ICONS */}
            <View style={styles.forecastHeaderRight}>
              <TouchableOpacity onPress={()=> navigation.navigate("Notification")} style={styles.forecastHeaderIconBtn}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={moderateScale(20)}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.forecastHeaderIconBtn}>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={moderateScale(20)}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

          </View>

          <View>
            <Text style={styles.forecastSubHeader}>
              Personalized AI prediction based on your Kundali + KIBIL
            </Text>
          </View>
         <ForecastTabs
  tabs={tabs}
  activeTab={activeTab}
  onTabPress={setActiveTab}
/>
           <View style={styles.forecastInsightContainer}>
      
      {/* ICON */}
      <MaterialCommunityIcons
        name="information-outline"
        size={moderateScale(16)}
        color="#FF8C1A"
        style={styles.forecastInsightIcon}
      />

      {/* TEXT */}
      <Text style={styles.forecastInsightText}>
        Compared to yesterday, overall outlook improved by 8%
      </Text>

    </View>
              <Text style={[commonStyle.title1, { marginTop: verticalScale(20) }]}>Pillar Insights</Text>
              <Text style={[commonStyle.cardSubTitle1, { marginTop: verticalScale(6) }]}>Tap any pillar to see detailed guidance</Text>

                <TouchableOpacity onPress={()=> navigation.navigate("CarrerGrowth")} style={styles.foreCastCardContainer}>
      
      {/* HEADER */}
      <View style={styles.foreCastHeaderRow}>
        <Text style={styles.foreCastTitle}>
          Career & Growth
        </Text>

        <MaterialCommunityIcons
          name="arrow-up"
          size={moderateScale(18)}
          color="#2F6B4F"
          style={{marginLeft:scale(6)}}
        />
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.foreCastDescription}>
        Strong communication windows opening.{"\n"}
        Good time for presentations and networking.
      </Text>

      {/* GRAPH PLACEHOLDER */}
      {/* <View style={styles.foreCastGraph} /> */}
      <Graph/>

      {/* FOOTER */}
      <View style={styles.foreCastFooterRow}>
        
        {/* LEFT BADGE */}
        <View style={styles.foreCastScoreBadge}>
          <View style={styles.foreCastDot} />
          <Text style={styles.foreCastScoreText}>75%</Text>
        </View>

        {/* RIGHT BADGE */}
        <View style={styles.foreCastConfidenceBadge}>
          <Text style={styles.foreCastConfidenceText}>
            Confident
          </Text>
        </View>

      </View>
    </TouchableOpacity>
    
       <TouchableOpacity onPress={()=>navigation.navigate("LoveRelation")} style={styles.foreCastCardContainer}>
      
      {/* HEADER */}
      <View style={styles.foreCastHeaderRow}>
        <Text style={styles.foreCastTitle}>
          Love & Relationships
        </Text>

        <MaterialCommunityIcons
          name="arrow-up"
          size={moderateScale(18)}
          color="#2F6B4F"
          style={{marginLeft:scale(6)}}
        />
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.foreCastDescription}>
        Strong communication windows opening.
        Good time for presentations and networking.
      </Text>

      {/* GRAPH PLACEHOLDER */}
      <Graph/>

      {/* FOOTER */}
      <View style={styles.foreCastFooterRow}>
        
        {/* LEFT BADGE */}
        <View style={styles.foreCastScoreBadge}>
          <View style={styles.foreCastDot} />
          <Text style={styles.foreCastScoreText}>75%</Text>
        </View>

        {/* RIGHT BADGE */}
        <View style={styles.foreCastConfidenceBadge}>
          <Text style={styles.foreCastConfidenceText}>
            Confident
          </Text>
        </View>

      </View>
       </TouchableOpacity>

        <View style={styles.foreCastCardContainer}>
      
      {/* HEADER */}
      <View style={styles.foreCastHeaderRow}>
        <Text style={styles.foreCastTitle}>
          Health & Vitality
        </Text>

        <MaterialCommunityIcons
          name="arrow-right"
          size={moderateScale(18)}
          color="#FFB020"
          style={{marginLeft:scale(6)}}
        />
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.foreCastDescription}>
       Energy levels stable. Focus on rest during afternoon hours.
      </Text>

      {/* GRAPH PLACEHOLDER */}
      <View style={styles.foreCastGraph} />

      {/* FOOTER */}
      <View style={styles.foreCastFooterRow}>
        
        {/* LEFT BADGE */}
        <View style={[styles.foreCastScoreBadge,{backgroundColor:"#FFB02015"}]}>
          <View style={[styles.foreCastDot,{backgroundColor:"#FFB020"}]} />
          <Text style={[styles.foreCastScoreText,{color:"#FFB020"}]}>75%</Text>
        </View>

        {/* RIGHT BADGE */}
        <View style={[styles.foreCastConfidenceBadge,{backgroundColor:"#FFB02015"}]}>
          <Text style={[styles.foreCastConfidenceText,{color:"#FFB020"}]}>
            Confident
          </Text>
        </View>

      </View>
       </View>

        <View style={styles.foreCastCardContainer}>
      
      {/* HEADER */}
      <View style={styles.foreCastHeaderRow}>
        <Text style={styles.foreCastTitle}>
          Finance & Wealth
        </Text>

        <MaterialCommunityIcons
          name="arrow-up"
          size={moderateScale(18)}
          color="#2F6B4F"
          style={{marginLeft:scale(6)}}
        />
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.foreCastDescription}>
        Strategic planning favored. Good time to
         review investments.
      </Text>

      {/* GRAPH PLACEHOLDER */}
      <Graph/>

      {/* FOOTER */}
      <View style={styles.foreCastFooterRow}>
        
        {/* LEFT BADGE */}
        <View style={styles.foreCastScoreBadge}>
          <View style={styles.foreCastDot} />
          <Text style={styles.foreCastScoreText}>75%</Text>
        </View>

        {/* RIGHT BADGE */}
        <View style={styles.foreCastConfidenceBadge}>
          <Text style={styles.foreCastConfidenceText}>
            Confident
          </Text>
        </View>

      </View>
       </View>

        <View style={styles.foreCastCardContainer}>
      
      {/* HEADER */}
      <View style={styles.foreCastHeaderRow}>
        <Text style={styles.foreCastTitle}>
          Spiritual Growths
        </Text>

        <MaterialCommunityIcons
          name="arrow-up"
          size={moderateScale(18)}
          color="#2F6B4F"
          style={{marginLeft:scale(6)}}
        />
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.foreCastDescription}>
       Heightened intuition and clarity. Meditation will be especially effective.
      </Text>

      {/* GRAPH PLACEHOLDER */}
      <Graph/>

      {/* FOOTER */}
      <View style={styles.foreCastFooterRow}>
        
        {/* LEFT BADGE */}
        <View style={styles.foreCastScoreBadge}>
          <View style={styles.foreCastDot} />
          <Text style={styles.foreCastScoreText}>75%</Text>
        </View>

        {/* RIGHT BADGE */}
        <View style={styles.foreCastConfidenceBadge}>
          <Text style={styles.foreCastConfidenceText}>
            Confident
          </Text>
        </View>

      </View>
       </View>

        <View style={styles.forecastConfidenceContainer}>
      
      {/* TITLE */}
      <Text style={styles.forecastConfidenceTitle}>
        Forecast Confidence: 82%
      </Text>

      {/* SUBTITLE */}
      <Text style={styles.forecastConfidenceSubtitle}>
        Based on your accurate data and recent patterns
      </Text>

      {/* BULLET LIST */}
      <View style={styles.forecastConfidenceList}>
        
        <View style={styles.forecastConfidenceItem}>
          <View style={styles.forecastConfidenceDot} />
          <Text style={styles.forecastConfidenceText}>
            Exact time of birth confirmed
          </Text>
        </View>

        <View style={styles.forecastConfidenceItem}>
          <View style={styles.forecastConfidenceDot} />
          <Text style={styles.forecastConfidenceText}>
            Recent behavior tracked
          </Text>
        </View>

        <View style={styles.forecastConfidenceItem}>
          <View style={styles.forecastConfidenceDot} />
          <Text style={styles.forecastConfidenceText}>
            Current transit alignment strong
          </Text>
        </View>

      </View>
    </View>

    <TouchableOpacity onPress={() => {
      console.log("fhfhfh")
      
      setShowWhyForecastModal(true)
      }} style={styles.whyForecastContainer}>
      
      {/* LEFT ICON */}
      <View style={styles.whyForecastIconWrapper}>
        <MaterialCommunityIcons
          name="information-outline"
          size={moderateScale(20)}
          color="#FF8C00"
        />
      </View>

      {/* TEXT CONTENT */}
      <View style={styles.whyForecastContent}>
        <Text style={styles.whyForecastTitle}>
          Why this forecast?
        </Text>
        <Text style={styles.whyForecastSubtitle}>
          Learn how we calculate your predictions
        </Text>
      </View>

      {/* RIGHT ARROW */}
      <MaterialCommunityIcons
        name="chevron-right"
        size={moderateScale(22)}
        color="#8A8FA3"
      />

    </TouchableOpacity>
     <TouchableOpacity   style={styles.whyForecastContainer}>
      
      <Text style={[styles.whyForecastSubtitle,{textAlign:'center'}]}>
        This forecast is guidance, not a guarantee. Use your wisdom alongside cosmic insights.
      </Text>
     

    </TouchableOpacity>

    
    

        </ScrollView>
        
    <Modal
  visible={showWhyForecastModal}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>

      {/* CLOSE BUTTON */}
      <TouchableOpacity
        style={styles.modalCloseBtn}
        onPress={() => {
          console.log("dhjhbfhfb")
          setShowWhyForecastModal(false)}}
      >
        <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
      </TouchableOpacity>

       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.modalScrollContent}
      >
      {/* TITLE */}
      <Text style={styles.modalTitle}>
                How We Calculate Your Forecast

      </Text>
      <Text style={styles.modalSubtitle}>
                Understanding the science and wisdom behind your predictions

      </Text>

       <View style={styles.modalCard}>
        <Text style={styles.modalCardTitle}>🪐 Transit Influence</Text>
        <Text style={styles.modalCardDesc}>
          Current planetary positions relative to your birth chart. Jupiter's transit through your 10th house strengthens career prospects, while Venus in your 7th house enhances relationships.
        </Text>
      </View>
         <View style={styles.modalCard}>
        <Text style={styles.modalCardTitle}>⏳ Dasha Period</Text>
        <Text style={styles.modalCardDesc}>
         You're in Venus Mahadasha and Mercury Antardasha—a favorable period for communication, creativity, and forming meaningful connections.
        </Text>
      </View>
       <View style={styles.modalCard}>
        <Text style={styles.modalCardTitle}>📊 Recent Behavior Impact</Text>
        <Text style={styles.modalCardDesc}>
        Your consistent morning meditation and recent focus on health routines have created positive momentum, improving overall forecast accuracy by 12%.
        </Text>
      </View>
       <View style={styles.modalCard}>
        <Text style={styles.modalCardTitle}>Data Quality Note</Text>
        <Text style={styles.modalCardDesc}>
      Your forecast accuracy is high (82%) because we have your exact birth time and location. Forecasts improve as we learn more about your patterns.
        </Text>
      </View>

        <View style={styles.forecastInsightContainer}>
      
      {/* ICON */}
      

      {/* TEXT */}
      <Text style={[styles.forecastInsightText,{textAlign:"center"}]}>
        Our AI combines Vedic astrology with behavioral science for personalized guidance
      </Text>

    </View>
    
    </ScrollView>

      

    </View>
  </View>
</Modal>

      </SafeAreaView>

    </ImageBackground>
  )
}

export default ForeCastScreen

const styles = StyleSheet.create({
  forecastHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
  },

  forecastHeaderLeft: {
    width: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  forecastHeaderTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },

  forecastHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  forecastHeaderIconBtn: {
    marginLeft: scale(12),
  },
  forecastSubHeader: {
    color: "#7E7EA9",
    textAlign: "center",
    fontSize: moderateScale(12),
    fontWeight: "400",
    marginTop: verticalScale(10)


  },
  forecastTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0B0F2A',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#4B557E',
    padding: scale(8),
    justifyContent: "center",
    marginTop: verticalScale(30),

    // alignSelf: 'flex-start',
  },

  forecastTabItem: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(18),
    borderRadius: moderateScale(12),
  },

  forecastTabItemActive: {
    backgroundColor: '#D4A017', // yellow/orange
  },

  forecastTabText: {
    color: '#8A8FA3',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  forecastTabTextActive: {
    color: '#111734',
    fontWeight: '500',
    fontSize: moderateScale(12)
  },
   forecastInsightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B3B0B', // brown/orange bg
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#FF8C1A',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(12),
    marginTop: verticalScale(14),
  },

  forecastInsightIcon: {
    marginRight: scale(8),
  },

  forecastInsightText: {
    color: '#989DB5',
    fontSize: moderateScale(12),
    flex: 1,
    lineHeight: moderateScale(16),
  },

 foreCastCard: {
     borderRadius: moderateScale(12),
    backgroundColor: '#1B1F36',
    borderWidth: 1,
    borderColor: '#3A3F66',
    padding: moderateScale(16),
    marginTop: verticalScale(20),
  },
   foreCastCardContainer: {
    backgroundColor: '#0B0F2A',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    padding: moderateScale(16),
    marginTop: verticalScale(16),
  },

  foreCastHeaderRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },

  foreCastTitle: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  foreCastDescription: {
    color: '#B8B8D0',
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
    lineHeight: moderateScale(22),
    fontWeight:"400"
  },

  foreCastGraph: {
    height: verticalScale(60),
    marginTop: verticalScale(14),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(34,197,94,0.15)', // soft green glow
  },

  foreCastFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(14),
  },

  foreCastScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34,197,94,0.15)',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(10),
  },

  foreCastDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#2B6148',
    marginRight: scale(6),
  },

  foreCastScoreText: {
    color: '#2F6B4F',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },

  foreCastConfidenceBadge: {
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(10),
  },

  foreCastConfidenceText: {
    color: '#2F6B4F',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  forecastConfidenceContainer: {
    backgroundColor: '#0B0F2A',
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    padding: moderateScale(16),
    marginTop: verticalScale(16),
  },

  forecastConfidenceTitle: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  forecastConfidenceSubtitle: {
    color: '#7E7EA9',
    fontSize: moderateScale(12),
    marginTop: verticalScale(6),
  },

  forecastConfidenceList: {
    marginTop: verticalScale(12),
  },

  forecastConfidenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },

  forecastConfidenceDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#22C55E', // green
    marginRight: scale(8),
  },

  forecastConfidenceText: {
    color: '#7E7EA9',
    fontSize: moderateScale(12),
  },
   whyForecastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B0F2A',
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#2E2E5E',
    padding: moderateScale(14),
    marginTop: verticalScale(16),
  },

  whyForecastIconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: 'rgba(255,140,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  whyForecastContent: {
    flex: 1,
  },

  whyForecastTitle: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },

  whyForecastSubtitle: {
    color: '#7E7EA9',
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },

  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'flex-end',
},

modalContainer: {
  height: '90%', // 👈 covers almost full screen
  backgroundColor: '#0B0F2A',
  borderTopLeftRadius: moderateScale(20),
  borderTopRightRadius: moderateScale(20),
  padding: moderateScale(16),
},

modalCloseBtn: {
  position: 'absolute',
  right: scale(12),
  top: verticalScale(10),
  backgroundColor:"#1A1640",
  width:scale(40),
  height:scale(40),
  borderRadius:scale(20),
  alignItems:"center",
  justifyContent:"center",
  zIndex:999
  
  // zIndex: 1,
},
modalScrollContent: {
  paddingBottom: verticalScale(20),
},

modalTitle: {
  marginTop: verticalScale(40), // 👈 pushes below close button
  color: '#fff',
  fontSize: moderateScale(18),
  fontWeight: '600',
},

modalSubtitle: {
  color: '#B8B8D0',
  fontSize: moderateScale(14),
  marginTop: scale(12),
  fontWeight:"400",
  marginBottom:verticalScale(20)
},

modalCard: {
  borderWidth: 1,
  borderColor: '#2E2E5E',
  borderRadius: moderateScale(12),
  padding: moderateScale(12),
  marginBottom: verticalScale(16),
  // marginTop:verticalScale(20)
},

modalCardTitle: {
  color: '#fff',
  fontSize: moderateScale(14),
  fontWeight: '600',
  marginBottom: verticalScale(4),
},

modalCardDesc: {
  color: '#B8B8D0',
  fontSize: moderateScale(12),
  lineHeight:moderateScale(18)
},

modalFooter: {
  backgroundColor: '#5A2E00',
  borderRadius: moderateScale(10),
  padding: moderateScale(12),
  marginTop: verticalScale(10),
},

modalFooterText: {
  color: '#FF8C00',
  fontSize: moderateScale(12),
  textAlign: 'center',
},
  
});