import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { commonStyle } from '../styles/commonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const StartRemedyScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const remedies = [
        {
            title: 'Start Chant',
            subtitle: '108 bead mala counting',
            icon: 'waveform',
            color: '#FF7A00',
        },
        {
            title: 'Meditation',
            subtitle: 'Guided & timed sessions',
            icon: 'meditation',
            color: '#00E5A0',
        },
        {
            title: 'Seva',
            subtitle: 'Act of service',
            icon: 'heart-outline',
            color: '#FF7A00',
        },
        {
            title: 'Donation',
            subtitle: 'Charitable giving',
            icon: 'hand-coin-outline',
            color: '#FFB020',
        },
        {
            title: 'Rituals',
            subtitle: 'Puja & ceremonies',
            icon: 'creation',
            color: '#FFB020',
        },
        {
            title: 'Lifestyle',
            subtitle: 'Daily habits',
            icon: 'account-outline',
            color: '#FF7A00',
        },
        {
            title: 'Vastu Fix',
            subtitle: 'Space harmony',
            icon: 'home-outline',
            color: '#FF7A00',
        },
        {
            title: 'Gemstone',
            subtitle: 'Recommendations',
            icon: 'diamond-stone',
            color: '#FF7A00',
        },
    ];

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

                        {/* LEFT BACK BUTTON */}
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
                            Remedies
                        </Text>

                    </View>

                    <Text style={[commonStyle.cardSubTitle1, { color: "#7E7EA9", fontSize: moderateScale(14), marginTop: verticalScale(16), textAlign: "center" }]}>
                        Choose a remedy category to improve your KIBIL score and balance your life pillars.
                    </Text>

                    <View style={styles.gridContainer}>
                        {remedies.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.gridCard} activeOpacity={0.8}>

                                {/* ICON */}
                                <View
                                    style={[
                                        styles.iconWrapper,
                                        { backgroundColor: `${item.color}20` }
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name={item.icon}
                                        size={moderateScale(20)}
                                        color={item.color}
                                    />
                                </View>

                                {/* TITLE */}
                                <Text style={styles.cardTitle}>{item.title}</Text>

                                {/* SUBTITLE */}
                                <Text style={styles.cardSubtitle}>
                                    {item.subtitle}
                                </Text>

                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={[styles.cardTitle,{color:"#fff",fontSize:moderateScale(18)}]}>
                        Recommended for You
                    </Text>

                    <TouchableOpacity activeOpacity={0.85} style={styles.routineCard}>
  
  {/* LEFT ICON */}
  <View style={styles.routineIconWrapper}>
    <MaterialCommunityIcons
      name="waveform"
      size={moderateScale(18)}
      color="#fff"
    />
  </View>

  {/* CONTENT */}
  <View style={styles.routineContent}>
    <Text style={styles.routineTitle}>
      Morning Chant Routine
    </Text>

    <Text style={styles.routineSubtitle}>
      Based on your chart, chanting “Om Namah Shivaya” 108 times will help balance your career planet.
    </Text>
    <TouchableOpacity>
        <TouchableOpacity style={styles.btn}>

    <Text style={styles.routineAction}>
      Start Now 
    </Text>
     <MaterialCommunityIcons
      name="arrow-right"
      size={moderateScale(14)}
      color="#FF7A00"
    />
    </TouchableOpacity>

    </TouchableOpacity>
  </View>

</TouchableOpacity>
                </ScrollView>
            </SafeAreaView>


        </ImageBackground>
    )
}

export default StartRemedyScreen

const styles = StyleSheet.create({

    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
    },

    gridCard: {
        width: '48%', // 👈 2 cards per row
        backgroundColor: '#0B0F2A',
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: '#2E2E5E',
        padding: moderateScale(16),
        marginBottom: verticalScale(14),
    },

    iconWrapper: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: 'rgba(255,165,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },

    cardTitle: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },

    cardSubtitle: {
        color: '#7E7EA9',
        fontSize: moderateScale(12),
        marginTop: verticalScale(4),
    },
    routineCard: {
  flexDirection: 'row',
  backgroundColor: '#0B0F2A',
  borderRadius: moderateScale(16),
  borderWidth: 1,
  borderColor: '#2E2E5E',
  padding: moderateScale(14),
  marginTop: verticalScale(16),
},

routineIconWrapper: {
  width: moderateScale(36),
  height: moderateScale(36),
  borderRadius: moderateScale(18),
  backgroundColor: '#FF9F2A',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: scale(12),
},

routineContent: {
  flex: 1,
},

routineTitle: {
  color: '#fff',
  fontSize: moderateScale(16),
  fontWeight: '600',
},

routineSubtitle: {
  color: '#7E7EA9',
  fontSize: moderateScale(12),
  marginTop: verticalScale(4),
  lineHeight: moderateScale(16),
},

routineAction: {
  color: '#FF8C00',
  fontSize: moderateScale(14),
  fontWeight: '600',
},
btn:{
    flexDirection:"row",
    alignItems:"center",
    gap:scale(8),
    marginTop:verticalScale(10)
    
    
}
})