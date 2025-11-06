import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

type TextButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'link' | 'checkbox';
  checked?: boolean;
  disabled?: boolean; // Adicionado
};

export default function TextButton({ 
  title, 
  onPress, 
  type = 'link', 
  checked = false,
  disabled = false 
}: TextButtonProps) {
  if (type === 'checkbox') {
    return (
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={onPress}
        disabled={disabled}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Ionicons name="checkmark" size={14} color={colors.white} />}
        </View>
        <Text style={[styles.checkboxText, disabled && styles.disabled]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[styles.linkText, disabled && styles.disabled]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  linkText: {
    color: '#9bf0e1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  disabled: {
    opacity: 0.5,
  },
});