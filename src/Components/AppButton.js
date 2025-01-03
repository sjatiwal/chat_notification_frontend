import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {AppColors} from '../utils/AppColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AppButton = ({
  text,
  width = wp(50),
  marginTop = hp(2),
  height = hp(5),
  borderRadius = wp(2),
  onPress,
  disabled,
}) => {
  // a reusable button
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        {
          width: width,
          marginTop: marginTop,
          height: height,
          borderRadius: borderRadius,
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: AppColors.pink,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: AppColors.white,
  },
});
