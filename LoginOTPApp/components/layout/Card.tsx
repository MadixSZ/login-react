import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius } from '../../constants/theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  transparent?: boolean;
};

export default function Card({ children, style, transparent = false }: CardProps) {
  return (
    <View style={[
      styles.card, 
      transparent ? styles.transparent : styles.default,
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: borderRadius.md,
    padding: 30,
    alignItems: 'center',
  },
  default: {
    backgroundColor: colors.background,
  },
  transparent: {
    backgroundColor: colors.cardBackground,
  },
});