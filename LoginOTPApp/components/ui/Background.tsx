import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';

type BackgroundProps = {
  children: ReactNode;
};

export default function Background({ children }: BackgroundProps) {
  // Para desenvolvimento, vamos usar uma cor de fundo temporária
  // Substitua pela sua imagem quando tiver
  const backgroundSource: ImageSourcePropType = require('../../assets/images/fundo.jpg');
  
  return (
    <ImageBackground 
      source={backgroundSource} 
      style={styles.background}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  } as ViewStyle,
});