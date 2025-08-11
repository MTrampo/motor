// import z from 'zod'
// import { forgotPasswordFormSchema, userSignInFormSchema } from '../validations/User'
// import { PlanEnum, PlanStatusEnum } from '../enums/Subscription'
// import { Timestamp } from 'firebase/firestore'
// import { DecodedIdToken } from 'firebase-admin/auth';
// import { AuthenticationCodeEnum } from '../enums/Authentication';
// import { fullNameFormatter } from '../utils/formatter';

// export interface AuthVerificationResult {
//   code: AuthenticationCodeEnum
//   decodedToken: DecodedIdToken | null
// }

// export interface UserFistore {
//   id: string
//   name: string
//   email: string
//   sub: SubscriptionFistore
//   createdAt: Timestamp
//   updatedAt: Timestamp
// }

// export interface SubscriptionFistore {
//   plan: number
//   startDate: Timestamp
//   endDate: Timestamp
//   status: number
//   planExternalId: string
//   subscriptionExternalId: string
// }

// export interface UserFormatted {
//   id: string
//   name: string
//   email: string
//   sub: SubscriptionFormatted
//   createdAt: Date
//   updatedAt: Date
// }

// export interface SubscriptionFormatted {
//   plan: PlanEnum
//   startDate: Date
//   endDate: Date
//   subExternalId: string
//   status: PlanStatusEnum
//   planExternalId: string
// }

// export type UserSignInFormInputs = z.infer<typeof userSignInFormSchema>
// export type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordFormSchema>
// export interface UserSignInRequestBody extends UserSignInFormInputs {}

// export function formatUser(user: UserFistore): UserFormatted {
//   return {
//     id: user.id,
//     name: fullNameFormatter(user.name),
//     email: user.email,
//     sub: {
//       plan: user.sub.plan as PlanEnum,
//       endDate: user.sub.endDate.toDate(),
//       startDate: user.sub.startDate.toDate(),
//       status: user.sub.status as PlanStatusEnum,
//       planExternalId: user.sub.planExternalId,
//       subExternalId: user.sub.subscriptionExternalId,
//     },
//     createdAt: user.createdAt.toDate(),
//     updatedAt: user.updatedAt.toDate()
//   }
// }