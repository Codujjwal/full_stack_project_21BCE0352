declare module '@/hooks/use-auth' {
  import { UseMutationResult } from "@tanstack/react-query";
  import { User, InsertUser } from "@shared/schema";

  export function useAuth(): {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    loginMutation: UseMutationResult<User, Error, Pick<InsertUser, "username" | "password">>;
    logoutMutation: UseMutationResult<void, Error, void>;
    registerMutation: UseMutationResult<User, Error, InsertUser>;
  };

  export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element;
}
