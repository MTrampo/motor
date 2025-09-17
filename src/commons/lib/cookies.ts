'use server'

import { cookies } from 'next/headers'
import { firebaseAdmin } from './firebase/server'
import { AuthVerificationResult } from '@/commons/models/User'
import { AuthenticationCodeEnum } from '@/commons/enums/Authentication'

const COOKIE_TEAM = 'MTOAITEAM';
//const COOKIE_NAME = '__Secure-mtoaiusrcrtkn'

export async function setTeamCookie(team: string): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_TEAM, team, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 60, // 60 dias
      path: '/',
      sameSite: 'strict',
    })
  } catch (error) {
    console.log(error)
  }
}

export async function getTeamCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(COOKIE_TEAM)?.value
  return cookieValue || null
}

export async function clearTeamCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_TEAM)
}

export async function hasTeamCookie(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get(COOKIE_TEAM)?.value
}

export async function checkIfHaveTeamSelectedAndIfNotSelectOne(team: string) {
  try {
    if (await hasTeamCookie()) return true

    await setTeamCookie(team)
    return true
  } catch (error: any) {
    console.error('Erro ao verificar ou selecionar time:', error)
    return false
  }
}