import "server-only";
import { db } from "~/server/db";
//import * as schema from "~/server/db/schema";

export const getEmployees = async () => {
  return await db.query.users.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
};


