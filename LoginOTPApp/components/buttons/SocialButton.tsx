import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

type SocialButtonProps = {
  provider: 'google' | 'facebook';
  onPress: () => void;
  style?: ViewStyle;
};

export default function SocialButton({ provider, onPress, style }: SocialButtonProps) {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: 'logo-google' as 'logo-google',
          text: 'Google',
          color: '#DB4437',
        };
      case 'facebook':
        return {
          icon: 'logo-facebook' as 'logo-facebook',
          text: 'Facebook',
          color: '#4267B2',
        };
      default:
        return {
          icon: 'logo-google' as 'logo-google',
          text: 'Google',
          color: '#DB4437',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity 
      style={[styles.button, { borderColor: config.color }, style]}
      onPress={onPress}
    >
      <Ionicons name={config.icon} size={20} color={config.color} />
      <Text style={[styles.text, { color: config.color }]}>{config.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  } as ViewStyle,
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  } as TextStyle,
});