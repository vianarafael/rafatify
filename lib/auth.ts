import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

// HOF used as middleware to protect the API routes

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "secret");
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw Error("Not a registered user");
        }
      } catch (e) {
        res.status(401);
        res.json({ error: "Not Authorized" });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({ error: "Not Authorized" });
  };
};
