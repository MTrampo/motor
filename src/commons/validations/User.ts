import z from 'zod'
import { AuthErrorCodes } from "firebase/auth";

export const userSignInFormSchema = z.object({
  email: z.email('Email inválido.').trim().min(1, 'Email obrigatório'),
  password: z.string('Senha obrigatória.').trim().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

export const forgotPasswordFormSchema = z.object({
  email: z.email('Email inválido').trim().min(1, 'Email obrigatório'),
})

export const firebaseAuthErrorMessages: Record<string, string> = {
  // Erros comuns de autenticação
  [AuthErrorCodes.USER_DELETED]: 'Email ou senha incorretos.',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Email ou senha incorretos.',
  'auth/argument-error': 'Erro de autenticação. Por favor, tente novamente.',
  [AuthErrorCodes.INVALID_EMAIL]: 'O endereço de email fornecido é inválido.',
  [AuthErrorCodes.USER_DISABLED]: 'Esta conta foi desativada por um administrador.',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Muitas tentativas de login. Por favor, tente novamente mais tarde.',
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: 'Problema de conexão. Verifique sua internet e tente novamente.',

  // Erros de token
  'auth/id-token-expired': 'Sua sessão expirou. Por favor, faça login novamente para continuar.',
  'auth/id-token-not-found': 'Sessão de autenticação não encontrada. Por favor, faça login novamente.',
  
  // Erros de criação de conta
  [AuthErrorCodes.EMAIL_EXISTS]: 'Este email já está em uso por outra conta.',
  [AuthErrorCodes.WEAK_PASSWORD]: 'A senha deve ter pelo menos 6 caracteres.',
  
  // Outros erros comuns
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: 'Este método de login não está disponível.',
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: 'Estas credenciais já estão vinculadas a outra conta.',
  
  // Erros genéricos (fallback)
  'default': 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.'
}

export function getFirebaseAuthErrorMessage(errorCode: string): string {
  return firebaseAuthErrorMessages[errorCode] || firebaseAuthErrorMessages.default;
}