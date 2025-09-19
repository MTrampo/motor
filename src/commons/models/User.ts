import z from 'zod'
import { forgotPasswordFormSchema, userSignInFormSchema } from '../validations/User'
import { Timestamp } from 'firebase/firestore'
import { DecodedIdToken } from 'firebase-admin/auth';
import { AuthenticationCodeEnum } from '../enums/Authentication';
import { fullNameFormatter } from '../utils/formatter';
import { TeamMemberFirestore, TeamMemberFormatted } from './Team';
import { translateEnum } from '../utils/enum-helpers';

export interface UserSession {
  code: AuthenticationCodeEnum
  decodedToken: DecodedIdToken | null
  selectedTeamId: string | null
}

export interface UserFistore {
  id: string
  name: string
  email: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface SubscriptionFistore {
  plan: number
  startDate: Timestamp
  endDate: Timestamp
  status: number
  planExternalId: string
  subscriptionExternalId: string
}

export interface UserFormatted {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface LoggedInUserFormatted extends UserFormatted {
  teams: TeamMemberFormatted[] | null
}

export type UserSignInFormInputs = z.infer<typeof userSignInFormSchema>
export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordFormSchema>
export interface UserSignInRequestBody extends UserSignInFormInputs {}

export function formatUser(user: UserFistore): UserFormatted {
  return {
    id: user.id,
    name: fullNameFormatter(user.name),
    email: user.email,
    createdAt: user.createdAt.toDate(),
    updatedAt: user.updatedAt.toDate()
  }
}

export function formatUserAndTeams(user: UserFistore, userTeams: TeamMemberFirestore[] | null): LoggedInUserFormatted {
  return {
    id: user.id,
    name: fullNameFormatter(user.name),
    email: user.email,
    teams: userTeams && userTeams.length > 0 ? userTeams.map(userTeam => ({
      ...userTeam,
      roleFormatted: translateEnum('RoleType', userTeam.role),
      createdAt: userTeam.createdAt.toDate(),
      updatedAt: userTeam.updatedAt.toDate()
    })) : null,
    createdAt: user.createdAt.toDate(),
    updatedAt: user.updatedAt.toDate()
  }
}