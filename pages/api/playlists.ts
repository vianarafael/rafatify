import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";
import { userInfo } from "os";

export default validateRoute(async (req, res, user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
  });
  res.json(playlists);
});
