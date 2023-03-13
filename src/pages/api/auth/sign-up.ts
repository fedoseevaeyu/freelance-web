import { withIronSessionApiRoute } from "iron-session/next/index";
import type { NextApiRequest, NextApiResponse } from "next";

import { Role } from "@domain/role";
import { User, sessionOptions } from "@lib/session";

type Data = User;

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const user: User = {
    id: 1,
    role: Role.Client,
    username: "test",
    avatarUrl: "",
    completed: false,
  };
  req.session.user = user;
  await req.session.save();

  res.status(200).json(user);
}

export default withIronSessionApiRoute(handler, sessionOptions);
