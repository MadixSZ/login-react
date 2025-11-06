import React from 'react';
import { TextInput, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../constants/theme';

type EmailInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean; // Adicionado
};

export default function EmailInput({ 
  value, 
  onChangeText, 
  placeholder = "Seu e-mail ou telefone",
  autoFocus = false // Adicionado
}: EmailInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      keyboardType="email-address"
      autoCapitalize="none"
      autoFocus={autoFocus} // Adicionado
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: colors.white,
    fontSize: 16,
  } as TextStyle,
});