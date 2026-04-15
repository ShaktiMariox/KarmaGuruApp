import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { commonStyle } from '../styles/commonStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Color } from '../utils/color';
import { fontSize } from '../utils/fontSize';


const WalletScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const tabs = [
        { id: 'balance', label: 'Balance' },
        { id: 'plans', label: 'Plan' },
        { id: 'transcation', label: 'Transcation' },

    ];

    const plans = [
        { id: '1', amount: 20, extra: 10 },
        { id: '2', amount: 50, extra: 25 },
        { id: '3', amount: 100, extra: 50 },
        { id: '4', amount: 200, extra: 100 },
        { id: '5', amount: 500, extra: 250 },
        { id: '6', amount: 1000, extra: 150 },
    ];

const transactions = [
  {
    id: '1',
    title: 'Astrologer Consultation',
    date: 'Feb 26, 2026',
    amount: -350,
  },
  {
    id: '2',
    title: 'Wallet Top-up',
    date: 'Feb 25, 2026',
    amount: 500,
  },
  {
    id: '3',
    title: 'Career Report',
    date: 'Feb 24, 2026',
    amount: -599,
  },
  {
    id: '4',
    title: 'Donation - Temple',
    date: 'Feb 23, 2026',
    amount: -108,
  },
];

    const [activeTab, setActiveTab] = useState('balance');
    const [selectedPlan, setSelectedPlan] = useState('2');


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
                            Wallet

                        </Text>

                    </View>
                    <View style={styles.tabContainer}>
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
                    </View>

                    {activeTab === "balance" &&  (

                   <>

                    <View style={[commonStyle.card, styles.walletCard]}>

                        {/* LEFT CONTENT */}
                        <View>
                            <Text style={styles.balanceLabel}>
                                Current Balance
                            </Text>

                            <Text style={styles.balanceAmount}>
                                ₹450
                            </Text>
                        </View>

                        {/* RIGHT BUTTON */}
                        <TouchableOpacity style={styles.topUpBtn}>
                            <MaterialCommunityIcons
                                name="plus"
                                size={moderateScale(18)}
                                color="#000"
                            />
                            <Text style={styles.topUpText}>
                                Top Up Wallet
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={[commonStyle.title1, { marginTop: verticalScale(20) }]}>
                        Quick Top-up
                    </Text>
                    <Text style={[commonStyle.cardSubTitle1, { marginTop: verticalScale(10), fontSize: fontSize.md }]}>
                        Choose Recharge Amount
                    </Text>

                    <View style={styles.grid}>
                        {plans.map((item) => {
                            const isSelected = item.id === selectedPlan;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.card,
                                        isSelected && styles.selectedCard,
                                    ]}
                                    onPress={() => setSelectedPlan(item.id)}
                                >
                                    {/* TOP AMOUNT */}
                                    <View style={styles.topSection}>
                                        <Text style={styles.amount}>
                                            ₹ {item.amount}
                                        </Text>
                                    </View>

                                    {/* BOTTOM EXTRA */}
                                    <View style={styles.bottomSection}>
                                        <Text style={styles.extra}>
                                            Get ₹ {item.extra} Extra
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[commonStyle.card, styles.invoiceCard]}
                        onPress={() => {
                            // navigation.navigate('InvoiceHistory')
                        }}
                    >
                        {/* LEFT SECTION */}
                        <View style={styles.leftSection}>

                            {/* ICON */}
                            <View style={styles.invoiceIcon}>
                                <MaterialCommunityIcons
                                    name="file-document-outline"
                                    size={moderateScale(20)}
                                    color="#F59E0B"
                                />
                            </View>

                            {/* TEXT */}
                            <View style={{ marginLeft: scale(10) }}>
                                <Text style={styles.invoiceTitle}>
                                    Invoice History
                                </Text>
                                <Text style={styles.invoiceSubtitle}>
                                    View all invoices
                                </Text>
                            </View>

                        </View>

                        {/* RIGHT CTA */}
                        <Text style={styles.viewText}>
                            View
                        </Text>

                    </TouchableOpacity>
                    </>

                     )}

                     {activeTab === 'plans' && (
  <View style={{ marginTop: verticalScale(16) }}>
    {[
      {
        id: '1',
        name: 'Basic',
        price: 99,
        validity: '1 month validity',
        credits: '10 credits',
        features: ['5 AI chats', 'Daily Horoscope'],
      },
      {
        id: '2',
        name: 'Premium',
        price: 499,
        validity: '3 months validity',
        credits: '50 credits',
        features: ['Unlimited AI', 'Priority support', '1 Free report'],
      },
      {
        id: '3',
        name: 'Pro',
        price: 1499,
        validity: '1 year validity',
        credits: '200 credits',
        features: ['All Premium', '5 Free reports', 'Free consultations'],
      },
    ].map((plan) => (
      <View key={plan.id} style={[commonStyle.card, styles.planCard]}>
        
        {/* HEADER */}
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planValidity}>{plan.validity}</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.planPrice}>₹{plan.price}</Text>
            <Text style={styles.planCredits}>{plan.credits}</Text>
          </View>
        </View>

        {/* FEATURES */}
        <View style={{ marginTop: verticalScale(10) }}>
          {plan.features.map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialCommunityIcons
                name="check-circle"
                size={moderateScale(14)}
                color="#00E0A4"
              />
              <Text style={styles.featureText}>
                {' '}{feature}
              </Text>
            </View>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.subscribeBtn}>
          <Text style={styles.subscribeText}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
    ))}
  </View>
)}


{activeTab === 'transcation' && (
  <View style={{ marginTop: verticalScale(16) }}>
    {transactions.map((item) => {
      const isCredit = item.amount > 0;

      return (
        <View
          key={item.id}
          style={[commonStyle.card, styles.transactionCard]}
        >
          <View style={styles.row}>
            
            {/* LEFT ICON */}
            <View
              style={[
                styles.txIcon,
                {
                  backgroundColor: isCredit
                    ? 'rgba(0,224,164,0.1)'
                    : 'rgba(239,68,68,0.1)',
                },
              ]}
            >
              <MaterialCommunityIcons
                name={isCredit ? 'arrow-down' : 'arrow-up'}
                size={moderateScale(18)}
                color={isCredit ? '#00E0A4' : '#EF4444'}
              />
            </View>

            {/* TEXT */}
            <View style={{ flex: 1, marginLeft: scale(10) }}>
              <Text style={styles.txTitle}>
                {item.title}
              </Text>
              <Text style={styles.txDate}>
                {item.date}
              </Text>
            </View>

            {/* AMOUNT */}
            <Text
              style={[
                styles.txAmount,
                { color: isCredit ? '#00E0A4' : '#EF4444' },
              ]}
            >
              {isCredit ? '+' : '-'}₹{Math.abs(item.amount)}
            </Text>

          </View>
        </View>
      );
    })}
  </View>
)}



                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: verticalScale(16)

    },

    tab: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
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
    walletCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(16),
        borderColor: Color.primarButtonBg,
        borderWidth: 1
    },

    balanceLabel: {
        color: '#B8B8D0',
        fontSize: fontSize.md,
    },

    balanceAmount: {
        color: '#989DB5',
        fontSize: moderateScale(36),
        fontWeight: '700',
        marginTop: verticalScale(4),
    },

    topUpBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.primarButtonBg,
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(14),
        borderRadius: moderateScale(8),
    },

    topUpText: {
        color: '#000',
        fontSize: fontSize.md,
        fontWeight: '600',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: verticalScale(16),
    },

    card: {
        width: '30%',
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A2A4A',
        marginBottom: verticalScale(12),
    },

    selectedCard: {
        borderColor: '#D4A017',
        borderWidth: 2,
    },

    topSection: {
        backgroundColor: '#1A1A3D',
        paddingVertical: verticalScale(18),
        alignItems: 'center',
    },

    bottomSection: {
        backgroundColor: '#D4A017',
        paddingVertical: verticalScale(10),
        alignItems: 'center',
    },

    amount: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '700',
    },

    extra: {
        color: '#000',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    invoiceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(16),
    },

    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    invoiceIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(10),
        backgroundColor: 'rgba(245,158,11,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    invoiceTitle: {
        color: '#FFFFFF',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },

    invoiceSubtitle: {
        color: '#A1A1AA',
        fontSize: moderateScale(12),
        marginTop: verticalScale(2),
    },

    viewText: {
        color: '#F59E0B',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    planCard: {
  marginBottom: verticalScale(14),
},

planHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

planName: {
  color: '#fff',
  fontSize: moderateScale(16),
  fontWeight: '600',
},

planValidity: {
  color: '#A1A1AA',
  fontSize: moderateScale(12),
},

planPrice: {
  color: '#F59E0B',
  fontSize: moderateScale(18),
  fontWeight: '700',
},

planCredits: {
  color: '#A1A1AA',
  fontSize: moderateScale(12),
},

featureRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: verticalScale(6),
},

featureText: {
  color: '#A1A1AA',
  fontSize: moderateScale(12),
},

subscribeBtn: {
  marginTop: verticalScale(14),
  borderWidth: 1.5,
  borderColor: '#F59E0B',
  borderRadius: moderateScale(20),
  paddingVertical: verticalScale(10),
  alignItems: 'center',
},

subscribeText: {
  color: '#F59E0B',
  fontSize: moderateScale(14),
  fontWeight: '600',
},

transactionCard: {
  marginBottom: verticalScale(12),
},

row: {
  flexDirection: 'row',
  alignItems: 'center',
},

txIcon: {
  width: moderateScale(40),
  height: moderateScale(40),
  borderRadius: moderateScale(20),
  justifyContent: 'center',
  alignItems: 'center',
},

txTitle: {
  color: '#FFFFFF',
  fontSize: moderateScale(14),
  fontWeight: '600',
},

txDate: {
  color: '#A1A1AA',
  fontSize: moderateScale(12),
  marginTop: verticalScale(2),
},

txAmount: {
  fontSize: moderateScale(14),
  fontWeight: '600',
},
})