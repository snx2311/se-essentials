import { u as useActor, a as useQuery, M as MemberTier, c as createActor } from "./proxy-B6IjP56z.js";
import { f as useInternetIdentity } from "./index-DHY5Q3pY.js";
function useAuth() {
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const isAuthenticated = loginStatus === "success";
  const principal = identity == null ? void 0 : identity.getPrincipal();
  const memberQuery = useQuery({
    queryKey: ["membership", principal == null ? void 0 : principal.toText()],
    queryFn: async () => {
      if (!actor) return MemberTier.Standard;
      return actor.getMyMembership();
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
  return {
    isAuthenticated,
    loginStatus,
    principal,
    login,
    logout: clear,
    memberTier: memberQuery.data ?? MemberTier.Standard
  };
}
export {
  useAuth as u
};
