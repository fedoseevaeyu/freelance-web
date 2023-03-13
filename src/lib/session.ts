import type { IronSessionOptions } from "iron-session";

import { Role } from "@domain/role";
export type User = {
  id: number;
  username: string;
  role: Role;
  avatarUrl: string;
  completed: boolean;
};

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "iron-session/freelance",
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
