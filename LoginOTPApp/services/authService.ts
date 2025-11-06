import { 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  updateProfile,
  signOut 
} from 'firebase/auth';
import { auth } from '../firebase/config';

export interface UserData {
  email: string;
  password: string;
  name?: string;
}

export class AuthService {
  // Login com email e senha - TRATAMENTO MELHORADO
  static async login(email: string, password: string) {
    try {
      console.log('Tentando login com:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido');
      
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.log('Código do erro:', error.code);
      console.log('Mensagem do erro:', error.message);
      
      let errorMessage = 'Erro ao fazer login';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta conta foi desativada';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Nenhuma conta encontrada com este email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        default:
          errorMessage = 'Erro ao fazer login. Tente novamente.';
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Registrar novo usuário
  static async register(userData: UserData) {
    try {
      console.log('Registrando usuário:', userData.email);
      
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );

      if (userData.name) {
        await updateProfile(userCredential.user, {
          displayName: userData.name
        });
      }

      // ENVIO REAL DE EMAIL DE VERIFICAÇÃO
      await sendEmailVerification(userCredential.user);
      
      await signOut(auth);

      return { 
        success: true, 
        message: '✅ Conta criada com sucesso! Verifique seu email (incluindo a pasta de SPAM) para ativar sua conta.'
      };
    } catch (error: any) {
      console.log('Erro no registro:', error.code);
      
      let errorMessage = 'Erro ao criar conta';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = '❌ Este email já está em uso';
          break;
        case 'auth/invalid-email':
          errorMessage = '❌ Email inválido';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = '❌ Operação não permitida';
          break;
        case 'auth/weak-password':
          errorMessage = '❌ Senha muito fraca (mínimo 6 caracteres)';
          break;
        default:
          errorMessage = '❌ Erro ao criar conta';
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // ENVIO REAL DE EMAIL DE RECUPERAÇÃO
  static async sendPasswordReset(email: string) {
    try {
      console.log('Enviando email de recuperação para:', email);
      await sendPasswordResetEmail(auth, email);
      
      return { 
        success: true,
        message: '✅ Email enviado! Verifique sua caixa de entrada (incluindo a pasta de SPAM).'
      };
    } catch (error: any) {
      console.log('Erro no envio de recuperação:', error.code);
      
      let errorMessage = 'Erro ao enviar email de recuperação';
      
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = '❌ Email inválido';
          break;
        case 'auth/user-not-found':
          errorMessage = '❌ Nenhuma conta encontrada com este email';
          break;
        default:
          errorMessage = '❌ Erro ao enviar email de recuperação';
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Reenviar email de verificação
  static async resendVerificationEmail() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { 
          success: true, 
          message: '✅ Email reenviado! Verifique sua caixa de entrada.' 
        };
      }
      return { success: false, error: '❌ Nenhum usuário logado' };
    } catch (error: any) {
      return { success: false, error: '❌ Erro ao reenviar email' };
    }
  }
}