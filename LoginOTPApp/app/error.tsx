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

export default function ErrorScreen() {
  const router = useRouter();

  const handleRecoverPassword = () => {
    Alert.alert('Recuperação', 'Redirecionando...');
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fundo.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="close-circle" size={80} color="#e74c3c" />
          <Text style={styles.errorTitle}>Erro no Login</Text>
          <Text style={styles.subtitle}>
            E-mail ou senha incorretos. Por favor, tente novamente.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={handleRecoverPassword}
            >
              <Text style={styles.secondaryButtonText}>Recuperar Senha</Text>
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
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
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