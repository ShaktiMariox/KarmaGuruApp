import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type ProgressCircleProps = {
  percent: number;
  color: string;
  label: string;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ percent, color, label }) => {
  const radius = 30;
const strokeWidth = 6;
const circumference = 2 * Math.PI * radius;

const totalSegments = 10;

// Each segment = dash + gap
const gap = 6;
const dash = (circumference - gap * totalSegments) / totalSegments;

// how many segments to fill
const filledSegments = Math.round((percent / 100) * totalSegments);
const strokeDashoffset = circumference - filledSegments * (dash + gap);

// total visible length
const progressLength = filledSegments * (dash + gap);

  return (
    <View style={styles.card}>
      <View style={styles.circleContainer}>
        <Svg width={80} height={80}>
  {/* Background full 10 segments */}
  <Circle
    stroke="#3A3A5A"
    fill="none"
    cx="40"
    cy="40"
    r={radius}
    strokeWidth={strokeWidth}
    strokeDasharray={`${dash} ${gap}`}
    rotation="-90"
    origin="40,40"
  />

  {/* Progress (continuous from start) */}
  <Circle
    stroke={color}
    fill="none"
    cx="40"
    cy="40"
    r={radius}
    strokeWidth={strokeWidth}
    strokeDasharray={`${progressLength} ${circumference}`}
    strokeLinecap="round"
    rotation="-90"
    origin="40,40"
  />
      </Svg>

        {/* Center Text */}
        <View style={styles.circleText}>
          <Text style={styles.percent}>{percent}%</Text>
        </View>
      </View>

      <Text style={styles.label}>{label}</Text>
    </View>
  );
};
export default ProgressCircle





const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 130,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E2E5E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,20,50,0.6)',
    
  },

  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  percent: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  label: {
    marginTop: 8,
    color: '#ccc',
  },
});