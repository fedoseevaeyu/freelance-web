import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest } from "next";

import { sessionOptions } from "@lib/session";

function handle(req: NextApiRequest) {
  req.session.destroy();
}

export default withIronSessionApiRoute(handle, sessionOptions);
