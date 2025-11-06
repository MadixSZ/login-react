import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function PasswordInput({ value, onChangeText, placeholder }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <TouchableOpacity 
        style={styles.eyeButton}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons 
          name={showPassword ? 'eye-off' : 'eye'} 
          size={20} 
          color={colors.textSecondary} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  } as ViewStyle,
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: colors.white,
    fontSize: 16,
    paddingRight: 50,
  } as TextStyle,
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  } as ViewStyle,
});