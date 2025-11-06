import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors } from '../../constants/theme';

type TitleProps = {
  children: ReactNode;
  style?: TextStyle;
};

export default function Title({ children, style }: TitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
    textAlign: 'center' as 'center',
  } as TextStyle,
});