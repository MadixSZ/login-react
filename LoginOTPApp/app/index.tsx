import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Usuários válidos para teste
  const validUsers = [
    { email: 'user@example.com', password: '123456' },
    { email: 'admin@teste.com', password: 'senha123' },
    { email: 'teste@teste.com', password: 'teste123' }
  ];

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);

    // Simular verificação
    setTimeout(() => {
      const user = validUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/error');
      }
      setLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Login Social', `Login com ${provider} em desenvolvimento...`);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/fundo.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Entrar na sua conta</Text>
            <Text style={styles.subtitle}>Use suas credenciais para acessar o sistema</Text>

            <TextInput
              style={styles.input}
              placeholder="seu@exemplo.com"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off' : 'eye'} 
                  size={20} 
                  color="rgba(255,255,255,0.5)" 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity 
                style={styles.rememberContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
                </View>
                <Text style={styles.rememberText}>Lembrar-me</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <Text style={styles.buttonText}>Entrando...</Text>
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou entrar com</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={[styles.socialText, { color: '#DB4437' }]}>Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                <Text style={[styles.socialText, { color: '#4267B2' }]}>Facebook</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Não tem conta? </Text>
              <TouchableOpacity>
                <Text style={styles.signupLink}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberContainer: {
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
    backgroundColor: '#7c25f8',
    borderColor: '#7c25f8',
  },
  rememberText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  forgotText: {
    color: '#9bf0e1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7c25f8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 10,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    gap: 8,
  },
  socialText: {
    fontSize: 14,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
  },
  signupLink: {
    color: '#9bf0e1',
    fontWeight: 'bold',
  },
});