import { createActor } from "@/backend";
import { MemberTier } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);

  const isAuthenticated = loginStatus === "success";
  const principal = identity?.getPrincipal();

  const memberQuery = useQuery<MemberTier>({
    queryKey: ["membership", principal?.toText()],
    queryFn: async () => {
      if (!actor) return MemberTier.Standard;
      return actor.getMyMembership();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  return {
    isAuthenticated,
    loginStatus,
    principal,
    login,
    logout: clear,
    memberTier: memberQuery.data ?? MemberTier.Standard,
  };
}
