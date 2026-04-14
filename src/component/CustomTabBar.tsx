import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topLine} />

      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            navigation.navigate(route.name);
          };

          // 🔥 Center Floating Button
          if (route.name === 'AI') {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.centerWrapper}
              >
                <View style={styles.centerButton} />
                <Text style={styles.centerLabel}>AI</Text>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
            >
              <Text
                style={{
                  color: isFocused ? '#FF8C00' : '#aaa',
                  fontSize: 12,
                }}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B0F1A',
    paddingBottom: 10,
  },

  topLine: {
    height: 2,
    backgroundColor: '#1F2937',
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 10,
  },

  tab: {
    alignItems: 'center',
  },

  centerWrapper: {
    alignItems: 'center',
    marginTop: -20,
  },

  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centerLabel: {
    fontSize: 12,
    color: '#FFA500',
    marginTop: 4,
  },
});