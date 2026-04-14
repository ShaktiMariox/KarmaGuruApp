import React, { ReactNode } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ScrollViewProps,
} from 'react-native';

import {
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

type ScreenWrapperProps = {
  children: ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backgroundImage?: ImageSourcePropType;
  scrollViewProps?: ScrollViewProps;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  backgroundImage,
  scrollViewProps,
}) => {
  const Container = scroll ? ScrollView : View;

  return (
    <ImageBackground
      source={
        backgroundImage || require('../assets/images/onBoardingBg.png')
      }
      style={[{ flex: 1 }, style]}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Container
          style={{ flex: 1 }}
          {...(scroll
            ? {
                contentContainerStyle: [
                  {
                    paddingHorizontal: scale(16),
                    paddingBottom: verticalScale(20),
                  },
                  contentContainerStyle,
                ],
                ...scrollViewProps,
              }
            : {})}
        >
          {children}
        </Container>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ScreenWrapper;