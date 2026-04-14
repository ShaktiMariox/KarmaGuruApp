import { ImageBackground, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { commonStyle } from '../styles/commonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ForecastTabs from '../component/ForeCastTab'
import Graph from '../component/GraphCard'


const CareerGrowthScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState('Day');
    const tabs = ['Day', 'Week', 'Month', 'Quarter', 'Year'];
    const [showWhyThisModal, setShowWhyThisModal] = useState(false);




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
                            Career & Growth
                        </Text>

                    </View>
                    <ForecastTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabPress={setActiveTab}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate("CarrerGrowth")} style={[commonStyle.card, { marginTop: verticalScale(16) }]}>
                        <Text style={commonStyle.foreCastContentTitle}>
                            Insight Summary

                        </Text>
                        <Text style={commonStyle.forCastContentSubTitle}>
                            Strong communication window today. Jupiter alignment enhances your ability to articulate ideas clearly and persuasively.
                        </Text>

                        {/* HEADER */}

                    </TouchableOpacity>
                    <View style={[commonStyle.card, { marginTop: verticalScale(16) }]}>
                        <Text style={[commonStyle.cardSubTitle1, { fontSize: moderateScale(14) }]}>
                            Trend Analysis
                        </Text>

                        <Graph />
                    </View>

                    <View style={[commonStyle.card, { marginTop: verticalScale(16) }]}>
                        <View style={styles.doHeader}>
                            <View style={styles.doHeaderIcon}>
                                <View style={styles.doCheckDot} />
                            </View>
                            <Text style={styles.doTitle}>DO</Text>
                        </View>

                        <Text style={styles.doSubtitle}>
                            Recommended actions for today
                        </Text>

                        {/* LIST */}
                        {[
                            'Schedule important meetings before noon',
                            'Present that pending proposal',
                            'Follow up on networking leads',
                        ].map((item, index) => (
                            <TouchableOpacity onPress={() => {
                                console.log("dhjdhdhd")
                                setShowWhyThisModal(true)
                            }} key={index} style={styles.doItemCard}>

                                {/* LEFT DOT */}
                                <View style={styles.doItemLeft}>
                                    <View style={styles.doItemDot} />
                                </View>

                                {/* TEXT */}
                                <View style={styles.doItemContent}>
                                    <Text style={styles.doItemText}>{item}</Text>

                                    <TouchableOpacity style={styles.doWhyBtn}>
                                        <Text style={styles.doWhyText}>Why?</Text>
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>
                        ))}

                    </View>

                    <View style={[commonStyle.card, { marginTop: verticalScale(16) }]}>

                        {/* HEADER */}
                        <View style={styles.avoidHeader}>
                            <View style={styles.avoidHeaderIcon}>
                                <Text style={styles.avoidCross}>✕</Text>
                            </View>
                            <Text style={styles.avoidTitle}>AVOID</Text>
                        </View>

                        <Text style={styles.avoidSubtitle}>
                            Things to avoid for today
                        </Text>

                        {/* LIST */}
                        {[
                            'Starting controversial discussions',
                            'Making impulsive commitments',
                        ].map((item, index) => (
                            <View key={index} style={styles.avoidItemCard}>

                                {/* LEFT DOT */}
                                <View style={styles.avoidDotWrapper}>
                                    <View style={styles.avoidDot} />
                                </View>

                                {/* TEXT */}
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.avoidItemText}>{item}</Text>

                                    <TouchableOpacity style={styles.avoidWhyBtn}>
                                        <Text style={styles.avoidWhyText}>Why?</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))}

                    </View>


                </ScrollView>
               {!showWhyThisModal && (
  <View style={styles.remedyBtnContainer}>
    <TouchableOpacity onPress={()=> navigation.navigate("StartRemedy")} activeOpacity={0.8} style={styles.remedyBtn}>
      <Text style={styles.remedyBtnText}>Start Remedy</Text>
      <MaterialCommunityIcons
        name="arrow-right"
        size={moderateScale(22)}
        color="#000"
      />
    </TouchableOpacity>
  </View>
)}
                <Modal
                    visible={showWhyThisModal}
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
                                    setShowWhyThisModal(false)
                                }}
                            >
                                <Text style={{ color: '#fff', fontSize: 18 }}>✕</Text>
                            </TouchableOpacity>


                            {/* TITLE */}
                            <Text style={styles.modalTitle}>
                                Why this Matters

                            </Text>
                            <View style={[commonStyle.card, { marginTop: verticalScale(12) }]}>
                                <Text style={styles.modalSubtitle}>
                                    Planetary alignments favor morning communications today, especially when Moon is in your 10th house.

                                </Text>
                            </View>






                        </View>




                    </View>



                </Modal>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default CareerGrowthScreen

const styles = StyleSheet.create({
    doHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    doHeaderIcon: {
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: 'rgba(34,197,94,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(8),
    },

    doCheckDot: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: '#22C55E',
    },

    doTitle: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },

    doSubtitle: {
        color: '#8A8FA3',
        fontSize: moderateScale(12),
        marginTop: verticalScale(6),
        marginBottom: verticalScale(14),
    },

    doItemCard: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#2E2E5E',
        borderRadius: moderateScale(14),
        padding: moderateScale(14),
        marginBottom: verticalScale(12),
    },

    doItemLeft: {
        marginRight: scale(10),
        justifyContent: 'flex-start',
    },

    doItemDot: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: '#22C55E',
        marginTop: verticalScale(4),
    },

    doItemContent: {
        flex: 1,
    },

    doItemText: {
        color: '#D1D5DB',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
    },

    doWhyBtn: {
        marginTop: verticalScale(8),
        alignSelf: 'flex-start',
        backgroundColor: '#5A2E00',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        borderRadius: moderateScale(6),
    },

    doWhyText: {
        color: '#FF8C00',
        fontSize: moderateScale(12),
        fontWeight: '500',
    },
    avoidHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avoidHeaderIcon: {
        width: moderateScale(28),
        height: moderateScale(28),
        borderRadius: moderateScale(14),
        backgroundColor: 'rgba(255,140,0,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: scale(8),
    },

    avoidCross: {
        color: '#FF8C00',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },

    avoidTitle: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },

    avoidSubtitle: {
        color: '#8A8FA3',
        fontSize: moderateScale(12),
        marginTop: verticalScale(6),
        marginBottom: verticalScale(14),
    },

    avoidItemCard: {
        flexDirection: 'row',
        borderRadius: moderateScale(16),
        padding: moderateScale(16),
        marginBottom: verticalScale(12),
        backgroundColor: 'rgba(255,255,255,0.03)',
    },

    avoidDotWrapper: {
        marginRight: scale(10),
    },

    avoidDot: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: '#F59E0B',
        marginTop: verticalScale(6),
    },

    avoidItemText: {
        color: '#E5E7EB',
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
    },

    avoidWhyBtn: {
        marginTop: verticalScale(8),
        alignSelf: 'flex-start',
        backgroundColor: '#5A2E00',
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(4),
        borderRadius: moderateScale(6),
    },

    avoidWhyText: {
        color: '#FF8C00',
        fontSize: moderateScale(12),
    },
    remedyBtnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: moderateScale(16),
        backgroundColor: 'transparent',
    },

    remedyBtn: {
        backgroundColor: '#FF8C1A',
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(14),
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
        gap: scale(10)
    },

    remedyBtnText: {
        color: '#000',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        //   height: '90%', // 👈 covers almost full screen
        backgroundColor: '#0B0F2A',
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        padding: moderateScale(16),
    },

    modalCloseBtn: {
        position: 'absolute',
        right: scale(12),
        top: verticalScale(10),
        backgroundColor: "#1A1640",
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999

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
        fontWeight: "400",
        marginBottom: verticalScale(20)
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
        lineHeight: moderateScale(18)
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


})