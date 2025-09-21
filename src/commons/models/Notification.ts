export interface PushSubscriptionDocData {
  readonly endpoint: string;
  readonly expirationTime: number | null;
  readonly keys: PushSubscriptionKeys;
}

export interface PushSubscriptionKeys {
  readonly auth: string;
  readonly p256dh: string;
}