import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

import { User, sessionOptions } from "@lib/session";

async function handle(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401);
  }
}

export default withIronSessionApiRoute(handle, sessionOptions);
