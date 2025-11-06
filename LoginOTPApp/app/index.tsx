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
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const router = useRouter();

  // Usuários válidos para teste (seu professor pode usar qualquer um)
  const validUsers = [
    { email: 'professor@escola.com', password: '123456' },
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
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleRecovery = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    Alert.alert(
      'Código de Recuperação', 
      `Seu código é: ${code}\n\nUse este código para recuperar sua senha.`
    );
  };

  const handleVerifyRecovery = () => {
    if (recoveryCode !== generatedCode) {
      Alert.alert('Erro', 'Código inválido. Tente novamente.');
      return;
    }

    Alert.alert('Sucesso', 'Código verificado! Sua senha foi redefinida para "123456".');
    setIsRecovery(false);
    setRecoveryCode('');
    setGeneratedCode('');
  };

  const handleBackToLogin = () => {
    setIsRecovery(false);
    setRecoveryCode('');
  };

  // TELA DE RECUPERAÇÃO DE SENHA
  if (isRecovery) {
    return (
      <ImageBackground 
        source={require('../assets/images/fundo.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.card}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>

              <Text style={styles.title}>Recuperar Senha</Text>
              <Text style={styles.subtitle}>
                Digite o código enviado para seu e-mail
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Código de 6 dígitos"
                placeholderTextColor="rgba(255,255,255,0.6)"
                value={recoveryCode}
                onChangeText={setRecoveryCode}
                keyboardType="numeric"
                maxLength={6}
              />

              <TouchableOpacity 
                style={styles.button}
                onPress={handleVerifyRecovery}
              >
                <Text style={styles.buttonText}>Verificar Código</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={handleRecovery}
              >
                <Text style={styles.secondaryButtonText}>Reenviar Código</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  // TELA DE LOGIN NORMAL
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
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="rgba(255,255,255,0.6)"
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
                  color="rgba(255,255,255,0.6)" 
                />
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

            <TouchableOpacity onPress={() => setIsRecovery(true)}>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <View style={styles.credentials}>
              <Text style={styles.credentialsTitle}>Credenciais para teste:</Text>
              <Text style={styles.credential}>professor@escola.com / 123456</Text>
              <Text style={styles.credential}>admin@teste.com / senha123</Text>
              <Text style={styles.credential}>teste@teste.com / teste123</Text>
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
    backgroundColor: 'rgba(0,0,0,0.7)', 
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
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
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.15)', 
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#7c25f8',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  secondaryButtonText: {
    color: '#7c25f8',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotText: {
    color: '#9bf0e1',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  credentials: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    width: '100%',
  },
  credentialsTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  credential: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});