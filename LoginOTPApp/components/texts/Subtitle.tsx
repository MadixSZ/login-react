import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../constants/theme';

type SubtitleProps = {
  children: ReactNode;
  style?: TextStyle;
};

export default function Subtitle({ children, style }: SubtitleProps) {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center' as 'center',
    marginBottom: 30,
  } as TextStyle,
});