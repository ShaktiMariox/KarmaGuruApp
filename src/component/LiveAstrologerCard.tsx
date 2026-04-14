import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type Props = {
    item: {
        name: string;
        skill: string;
        viewers: number;
        image: any;
    };
};

const LiveAstrologerCard: React.FC<Props> = ({ item }) => {
    return (
        <View style={styles.liveAstroCardContainer}>

            {/* LEFT IMAGE */}
            <View style={styles.firstSection}>
            <View style={styles.liveAstroImageWrapper}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#4B557E" />

            </View>

            {/* RIGHT CONTENT */}
            <View style={styles.liveAstroContent}>

                <Text style={styles.liveAstroName} numberOfLines={1}>
                    {item.name}
                </Text>

                <Text style={styles.liveAstroSkill} numberOfLines={1}>
                    {item.skill}
                </Text>
                  </View>
                  </View>

                {/* BOTTOM ROW */}
                <View style={styles.liveAstroBottomRow}>

                    {/* VIEWERS */}
                    <View style={styles.liveAstroViewerRow}>
                        <View style={styles.liveIndicator} />
                        <Text style={styles.viewerText}>
                            {item.viewers} Watching
                        </Text>
                    </View>

                    {/* BUTTON */}
                    <TouchableOpacity style={styles.joinLiveButton}>
                        <Text style={styles.joinLiveText}>Join Live</Text>
                    </TouchableOpacity>

                </View>

          

        </View>
    );
};

export default LiveAstrologerCard;

const styles = StyleSheet.create({
    // 🔥 MAIN CARD
    liveAstroCardContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        width: moderateScale(260),
        borderRadius: moderateScale(16),
        borderWidth: 1,
        borderColor: '#2E2E5E',
        backgroundColor: 'rgba(20,20,50,0.6)',
        padding: moderateScale(12),
        marginRight: scale(12),
    },

    // 🔥 IMAGE WRAPPER
    liveAstroImageWrapper: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(12),
        backgroundColor: '#1F2340',
        justifyContent: 'center',
        alignItems: 'center',
    },

    liveAstroImage: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
    },

    // 🔥 CONTENT
    liveAstroContent: {
        // flexDirection:"row",
        // flex: 1,
        marginLeft: scale(10),
    },

    liveAstroName: {
        color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '500',
    },

    liveAstroSkill: {
        color: '#989DB5',
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
    fontWeight:"400"
    },

    // 🔥 BOTTOM ROW
    liveAstroBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(8),
    },

    // 🔥 VIEWERS
    liveAstroViewerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    liveIndicator: {
        width: moderateScale(6),
        height: moderateScale(6),
        borderRadius: moderateScale(3),
        backgroundColor: '#00FF94',
        marginRight: scale(6),
    },

    viewerText: {
        color: '#9CA3AF',
        fontSize: moderateScale(10),
    },

    // 🔥 BUTTON
    joinLiveButton: {
        borderWidth: 1,
        borderColor: '#FF8C00',
        borderRadius: moderateScale(4),
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(14),
    },

    joinLiveText: {
        color: '#FF8C1A',
        fontSize: moderateScale(14),
        fontWeight: '400',
    },
    firstSection:{
        flexDirection:"row",
        alignItems:"center"
    }
});