import Router from "next/router";
import useSWR from "swr";
import { useEffect } from "react";

import { User } from "@lib/session";

export default function useUser(redirectTo?: string) {
  const { data: user, mutate } = useSWR<User>("/api/auth/me");

  useEffect(() => {
    if (redirectTo && !user) {
      void Router.push(redirectTo);
    }
  }, [user, redirectTo]);

  return { user, mutate, isAuth: !!user };
}
