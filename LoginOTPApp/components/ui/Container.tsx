import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../constants/theme';

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    padding: 20,
    backgroundColor: colors.background,
  } as ViewStyle,
});