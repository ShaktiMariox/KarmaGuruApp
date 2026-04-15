import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type Props = {
  tabs: string[];
  activeTab: string;
  onTabPress: (tab: string) => void;
};

const ForecastTabs: React.FC<Props> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.forecastTabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.forecastTabItem,
              isActive && styles.forecastTabItemActive,
            ]}
            onPress={() => onTabPress(tab)}
          >
            <Text
              style={[
                styles.forecastTabText,
                isActive && styles.forecastTabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ForecastTabs;

const styles = StyleSheet.create({
  forecastTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0B0F2A',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#4B557E',
    padding: scale(8),
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },

 forecastTabItem: {
  flex: 1,                      // ✅ distribute equally
  paddingVertical: verticalScale(8),
  alignItems: 'center',         // ✅ center text
  borderRadius: moderateScale(12),
},
  forecastTabItemActive: {
    backgroundColor: '#D4A017',
  },

  forecastTabText: {
    color: '#8A8FA3',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },

  forecastTabTextActive: {
    color: '#111734',
    fontWeight: '500',
  },
});