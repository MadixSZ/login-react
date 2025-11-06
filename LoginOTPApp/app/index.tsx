import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

import Background from '../components/ui/Background';
import Container from '../components/ui/Container';
import Card from '../components/layout/Card';
import Title from '../components/texts/Title';
import Subtitle from '../components/texts/Subtitle';
import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import TextButton from '../components/buttons/TextButton';
import { AuthService } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(''); // Estado para erro de login
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      router.replace('/home' as any);
    }
  }, [user]);

  const handleLogin = async () => {
    // Limpar erro anterior
    setLoginError('');
    
    if (!email || !password) {
      setLoginError('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLoginError('Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);
    const result = await AuthService.login(email, password);
    setLoading(false);

    if (result.success) {
      router.replace('/home' as any);
    } else {
      // Mostrar erro diretamente na tela
      setLoginError(result.error);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail.');
      return;
    }

    setLoading(true);
    const result = await AuthService.sendPasswordReset(email);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Email Enviado!', 
        result.message,
        [{ text: 'OK', onPress: () => setIsRecovery(false) }]
      );
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  // TELA DE RECUPERAÇÃO DE SENHA
  if (isRecovery) {
    return (
      <Background>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Container>
            <Card>
              <TextButton 
                title="← Voltar para o login" 
                onPress={() => setIsRecovery(false)} 
              />

              <Title>Recuperar Senha</Title>
              <Subtitle>
                Digite seu email para receber um link de recuperação
              </Subtitle>

              <EmailInput 
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
              />

              <PrimaryButton 
                title={loading ? "Enviando..." : "Enviar Link de Recuperação"} 
                onPress={handlePasswordReset}
                loading={loading}
                disabled={loading}
              />

              <View style={styles.note}>
                <Text style={styles.noteText}>
                  📧 Verifique sua caixa de entrada e a pasta de SPAM.
                </Text>
              </View>
            </Card>
          </Container>
        </ScrollView>
      </Background>
    );
  }

  // TELA DE LOGIN NORMAL
  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Container>
          <Card>
            <Title>Entrar na sua conta</Title>
            <Subtitle>
              Use suas credenciais para acessar o sistema
            </Subtitle>

            <EmailInput 
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
            />

            <PasswordInput 
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
            />

            {/* MOSTRAR ERRO DE LOGIN DIRETAMENTE NA TELA */}
            {loginError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

            <View style={styles.optionsRow}>
              <TextButton 
                title="Lembrar de mim"
                type="checkbox"
                checked={rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              />
              
              <TextButton 
                title="Esqueceu a senha?"
                onPress={() => setIsRecovery(true)}
              />
            </View>

            <PrimaryButton 
              title={loading ? "Entrando..." : "Entrar"} 
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            <PrimaryButton 
              title="Criar uma conta"
              onPress={() => router.push('/signup' as any)}
              type="secondary"
            />

            <View style={styles.credentials}>
              <Text style={styles.credentialsTitle}>💡 Para testar:</Text>
              <Text style={styles.credential}>1. Crie uma conta nova</Text>
              <Text style={styles.credential}>2. Verifique seu email (inclusive SPAM)</Text>
              <Text style={styles.credential}>3. Faça login com email e senha</Text>
            </View>
          </Card>
        </Container>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  credentials: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    width: '100%',
  },
  credentialsTitle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  credential: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  note: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
  },
  noteText: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  errorContainer: {
    width: '100%',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
});