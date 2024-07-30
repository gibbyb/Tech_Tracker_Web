import "server-only";
import { db } from "~/server/db";
import { sql } from "drizzle-orm";

export const getEmployees = async () => {
  return await db.query.users.findMany({
    orderBy: (model, { asc }) => asc(model.id),
  });
};

// Update Employee Status uses Raw SQL because Drizzle ORM doesn't support
// update with MySQL
export const updateEmployeeStatus =
  async (employeeIds: string[], newStatus: string) => {
  try {
    // Convert array of ids to a format suitable for SQL query (comma-separated string)
    const idList = employeeIds.map(id => parseInt(id, 10));
    let updatedAt = new Date();
    // Not sure why but localhost is off by 5 hours
    if (process.env.NODE_ENV === 'development')
      updatedAt = new Date(updatedAt.setHours(updatedAt.getUTCHours())+ 5);
    const query = sql`
      UPDATE users
      SET status = ${newStatus}, updatedAt = ${updatedAt}
      WHERE id IN ${idList}
    `;
    await db.execute(query);
    return { success: true };
  } catch (error) {
    console.error("Error updating employee status:", error);
    throw new Error("Failed to update status");
  }
};

// Function to Update Employee Status by Name using Raw SQL
export const updateEmployeeStatusByName =
  async (technicians:{ name: string, status: string }[]) => {
  try {
    for (const technician of technicians) {
      const { name, status } = technician;
      const query = sql`
        UPDATE users
        SET status = ${status}, updatedAt = ${new Date()}
        WHERE name = ${name}
      `;
      await db.execute(query);
    }
    return { success: true };
  } catch (error) {
    console.error("Error updating employee status by name:", error);
    throw new Error("Failed to update status by name");
  }
};

// Type definitions for Paginated History API
type HistoryEntry = {
  name: string;
  status: string;
  updatedAt: Date;
}
type PaginatedHistory = {
  data: HistoryEntry[];
  meta: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  }
}

export const get_history = async (user_id: number, page: number, perPage: number): Promise<PaginatedHistory> => {
  const offset = (page - 1) * perPage;
  let historyQuery = sql`
    SELECT u.name, h.status, h.updatedAt
    FROM history h
    JOIN users u ON h.user_id = u.id
    WHERE h.user_id = ${user_id}
    ORDER BY h.id DESC
    LIMIT ${perPage} OFFSET ${offset}
  `;
  let countQuery = sql`
    SELECT COUNT(*) AS total_count
    FROM history
    WHERE user_id = ${user_id}
  `;
  if (user_id === -1) {
    historyQuery = sql`
      SELECT u.name, h.status, h.updatedAt
      FROM history h
      JOIN users u ON h.user_id = u.id
      ORDER BY h.id DESC
      LIMIT ${perPage} OFFSET ${offset}
    `;
    countQuery = sql`
      SELECT COUNT(*) AS total_count
      FROM history
    `;
  } 
  const [historyresults, countresults] = await Promise.all([
    db.execute(historyQuery), 
    db.execute(countQuery),
  ]);
  // Safely cast results
  const historyrows = historyresults[0] as unknown as
    { name: string, status: string, updatedAt: Date }[];
  const countrow = countresults[0] as unknown as { total_count: number }[];
  const totalCount = countrow[0]?.total_count ?? 0;
  const totalPages = Math.ceil(totalCount / perPage);
  // Format and map results
  const formattedResults: HistoryEntry[] = historyrows.map(row => ({
    name: row.name,
    status: row.status,
    updatedAt: new Date(row.updatedAt),
  }));
  return {
    data: formattedResults,
    meta: {
      current_page: page,
      per_page: perPage,
      total_pages: totalPages,
      total_count: totalCount,
    }
  };
};

//export const getHistory =
  //async (page: number, perPage: number): Promise<PaginatedHistory> => {
  //const offset = (page - 1) * perPage;
  //const historyQuery = sql`
    //SELECT u.name, h.status, h.updatedAt
    //FROM history h
    //JOIN users u ON h.user_id = u.id
    //ORDER BY h.id DESC
    //LIMIT ${perPage} OFFSET ${offset}
  //`;
  //const countQuery = sql`
    //SELECT COUNT(*) AS total_count
    //FROM history
  //`;
  //const [historyResults, countResults] = await Promise.all([
    //db.execute(historyQuery), 
    //db.execute(countQuery),
  //]);
  //// Safely cast results
  //const historyRows = historyResults[0] as unknown as
    //{ name: string, status: string, updatedAt: Date }[];
  //const countRow = countResults[0] as unknown as { total_count: number }[];
  //const totalCount = countRow[0]?.total_count ?? 0;
  //const totalPages = Math.ceil(totalCount / perPage);
  //// Format and map results
  //const formattedResults: HistoryEntry[] = historyRows.map(row => ({
    //name: row.name,
    //status: row.status,
    //updatedAt: new Date(row.updatedAt),
  //}));
  //return {
    //data: formattedResults,
    //meta: {
      //current_page: page,
      //per_page: perPage,
      //total_pages: totalPages,
      //total_count: totalCount,
    //}
  //};
//};

