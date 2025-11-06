import React from 'react';
import { 
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const handleContinue = () => {
    Alert.alert('Próximo passo', 'Navegar para dashboard...');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fundo.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={80} color="#2ecc71" />
          <Text style={styles.successTitle}>Login Bem-Sucedido!</Text>
          <Text style={styles.subtitle}>
            Bem-vindo de volta! Você entrou com sucesso em sua conta.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.secondaryButtonText}>Voltar ao Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginTop: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#7c25f8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7c25f8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#7c25f8',
    fontSize: 16,
    fontWeight: '600',
  },
});