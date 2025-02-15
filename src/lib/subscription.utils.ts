import { Session } from "next-auth";

export function hasActiveSubscription(session: Session | null): boolean {
  if (!session?.user?.subscription) return false;
  
  const { status, endDate } = session.user.subscription;
  return status === 'active' && 
         (!endDate || new Date(endDate) > new Date());
}

export function canAccessResource(
  session: Session | null, 
  resourceType: 'free' | 'premium'
): boolean {
  if (resourceType === 'free') return true;
  return hasActiveSubscription(session);
} 