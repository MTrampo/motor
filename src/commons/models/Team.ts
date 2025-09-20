import { Timestamp } from 'firebase-admin/firestore';
import { PlanEnum, PlanStatusEnum } from '../enums/Subscription'
import { RoleEnum } from '../enums/Organization';

export interface TeamFirestore {
  name: string;
  ownerId: string;
  sub: SubscriptionFirestore
  memberCount: number;
  memberLimit: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TeamMemberFirestore {
  id: string;
  userId: string;
  team: {
    id: string;
    name: string;
  };
  role: RoleEnum;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SubscriptionFirestore {
  plan: PlanEnum
  startDate: Date
  endDate: Date
  subExternalId: string
  status: PlanStatusEnum
  planExternalId: string
}

export interface TeamMemberFormatted extends Omit<TeamMemberFirestore, 'createdAt' | 'updatedAt'> {
  roleFormatted: string;
  createdAt: Date;
  updatedAt: Date;
}