import React from 'react';
import { View } from 'react-native';
import { AreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const Graph = () => {
  const data = [10, 20, 25, 40, 55, 60, 58]; // adjust to your curve

  const Gradient = () => (
    <Defs key={'gradient'}>
      <LinearGradient id={'grad'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'#22C55E'} stopOpacity={0.4} />
        <Stop offset={'100%'} stopColor={'#22C55E'} stopOpacity={0.05} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View style={{ height: verticalScale(80) }}>
      <AreaChart
        style={{ flex: 1 }}
        data={data}
        curve={shape.curveMonotoneX}
        svg={{
          fill: 'url(#grad)',
          stroke: '#22C55E',
          strokeWidth: 2,
        }}
        contentInset={{ top: 10, bottom: 0 }}
      >
        <Gradient />
      </AreaChart>
    </View>
  );
};

export default Graph;