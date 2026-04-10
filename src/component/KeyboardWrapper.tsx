// components/KeyboardWrapper.tsx
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const KeyboardWrapper = ({ children }:any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardWrapper;