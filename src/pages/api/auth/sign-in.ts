import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  username: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ username: "test" });
}