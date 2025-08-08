'use server'

import { cookies } from 'next/headers'
import { firebaseAdmin } from './server'
import { AuthVerificationResult } from '@/commons/models/User'
import { AuthenticationCodeEnum } from '@/commons/enums/Authentication'

const COOKIE_NAME = 'MTOAIUSRCRTKN'
//const COOKIE_NAME = '__Secure-mtoaiusrcrtkn'

export async function setToken(token: string): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 15, // 15 dias
        path: '/',
        sameSite: 'strict',
    })
  } catch (error) {
    console.log(error)
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(COOKIE_NAME)?.value
  return cookieValue || null
}

export async function clearToken(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function hasToken(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get(COOKIE_NAME)?.value
}

export async function verifyAndSetAuthenticatedUserToken(token: string) {
  try {
    await firebaseAdmin.auth.verifyIdToken(token)
    await setToken(token)

    return true
  } catch (error: any) {
    console.error('Erro ao verificar e setar o token:', error)
    return false
  }
}

export async function getAuthenticatedUser(): Promise<AuthVerificationResult> {
  let result: AuthVerificationResult = {
    code: AuthenticationCodeEnum.DEFAULT,
    decodedToken: null,
  }

  try {
    const token = await getToken();
    if (!token) {
      result.code = AuthenticationCodeEnum.ID_TOKEN_NOT_FOUND;
      return result;
    }

    result.decodedToken = await firebaseAdmin.auth.verifyIdToken(token);
    return result;
  } catch (err: any) {
    result.code = err.code;
    console.log('Falha ao verificar token:', err)
    return result;
  }
}
