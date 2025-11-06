import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../constants/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'primary' | 'secondary';
};

export default function PrimaryButton({ 
  title, 
  onPress, 
  loading = false, 
  disabled = false,
  type = 'primary'
}: PrimaryButtonProps) {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return [styles.button, styles.primary];
      case 'secondary':
        return [styles.button, styles.secondary];
      default:
        return [styles.button, styles.primary];
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={type === 'primary' ? colors.white : colors.primary} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginBottom: 12,
    flexDirection: 'row' as 'row',
  } as ViewStyle,
  primary: {
    backgroundColor: colors.primary,
  } as ViewStyle,
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  } as ViewStyle,
  disabled: {
    opacity: 0.6,
  } as ViewStyle,
  primaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  } as TextStyle,
  secondaryText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  } as TextStyle,
});