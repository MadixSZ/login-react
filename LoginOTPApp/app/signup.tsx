import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import Background from '../components/ui/Background';
import Container from '../components/ui/Container';
import Card from '../components/layout/Card';
import Title from '../components/texts/Title';
import Subtitle from '../components/texts/Subtitle';
import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import TextButton from '../components/buttons/TextButton';
import { AuthService, UserData } from '../services/authService';
import { colors } from '../constants/theme';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);

    const userData: UserData = {
      email,
      password,
      name: name || undefined
    };

    const result = await AuthService.register(userData);

    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Sucesso!', 
        result.message,
        [
          {
            text: 'OK',
            onPress: () => router.replace('/')
          }
        ]
      );
    } else {
      Alert.alert('Erro no Cadastro', result.error);
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Container>
          <Card>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.white} />
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>

            <Title>Criar Conta</Title>
            <Subtitle>Preencha os dados para se cadastrar</Subtitle>

            <EmailInput 
              value={name}
              onChangeText={setName}
              placeholder="Seu nome (opcional)"
            />

            <EmailInput 
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
            />

            <PasswordInput 
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha (mín. 6 caracteres)"
            />

            <PasswordInput 
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirme sua senha"
            />

            <PrimaryButton 
              title={loading ? "Criando conta..." : "Criar conta"} 
              onPress={handleSignUp}
              loading={loading}
              disabled={loading}
            />

            <TextButton 
              title="Já tem uma conta? Faça login"
              onPress={() => router.back()}
            />

            <View style={styles.note}>
              <Text style={styles.noteText}>
                📧 Verifique sua caixa de entrada e a pasta de SPAM após criar a conta.
              </Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    color: colors.white,
    marginLeft: 8,
    fontSize: 16,
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
});