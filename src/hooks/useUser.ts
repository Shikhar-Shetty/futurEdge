import { useSession } from "next-auth/react";

export interface AppUser {
  id: string;
  name?: string | null;
  email?: string | null;
}

export function useUser() {
  const { data: session, status } = useSession();

  const userId = (
    (session?.user as any)?._id || 
    (session?.user as any)?.id || 
    session?.user?.email || 
    ''
  );

  const userName = session?.user?.name || '';

  return {
    user: session?.user ? {
      id: userId,
      name: session.user.name,
      email: session.user.email
    } : null,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    id: userId,
    name: userName
  };
}