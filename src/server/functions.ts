import "server-only";
import { db } from "~/server/db";
import { sql } from "drizzle-orm";

// Function to Convert Date to UTC
const convertToUTC = (date: Date): Date => {
  const utcDate = new Date(date.setHours(date.getUTCHours() + 24));
  return utcDate;
}

// Function to Get Employees
export const getEmployees = async () => {
  return await db.query.users.findMany({
    orderBy: (model, { asc }) => asc(model.id),
  });
};

// Function to Update Employee Status using Raw SQL
export const updateEmployeeStatus = async (employeeIds: string[], newStatus: string) => {
  try {
    // Convert array of ids to a format suitable for SQL query (comma-separated string)
    const idList = employeeIds.map(id => parseInt(id, 10));
    const updatedAt = new Date();
    const utcdate: Date = convertToUTC(updatedAt);

    // Prepare the query using drizzle-orm's template-like syntax for escaping variables
    const query = sql`
      UPDATE users
      SET status = ${newStatus}, updatedAt = ${updatedAt}
      WHERE id IN ${idList}
    `;

    // Execute the query
    await db.execute(query);

    return { success: true };
  } catch (error) {
    console.error("Error updating employee status:", error);
    throw new Error("Failed to update status");
  }
};

// Legacy Functions for Legacy API for iOS App

// Type definitions
interface HistoryEntry {
  name: string;
  status: string;
  time: Date;
}

interface PaginatedHistory {
  data: HistoryEntry[];
  meta: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  }
}

export const legacyGetEmployees = async () => {
  const employees = await db.query.users.findMany({
    orderBy: (model, { asc }) => asc(model.id),
  });
  if (employees.length === 0) {
    return [];
  }
  for (const employee of employees) {
    const date = new Date(employee.updatedAt);
    employee.updatedAt = date;
  }
  return employees;
};

// Function to Get History Data with Pagination using Raw SQL
export const legacyGetHistory = async (page: number, perPage: number): Promise<PaginatedHistory> => {
  const offset = (page - 1) * perPage;

  // Raw SQL queries
  const historyQuery = sql`
    SELECT u.name, h.status, h.updatedAt
    FROM history h
    JOIN users u ON h.user_id = u.id
    ORDER BY h.id DESC
    LIMIT ${perPage} OFFSET ${offset}
  `;
  
  const countQuery = sql`
    SELECT COUNT(*) AS total_count
    FROM history
  `;

  const [historyResults, countResults] = await Promise.all([
    db.execute(historyQuery), 
    db.execute(countQuery),
  ]);

  // Safely cast results
  const historyRows = historyResults[0] as unknown as { name: string, status: string, updatedAt: Date }[];
  const countRow = countResults[0] as unknown as { total_count: number }[];

  const totalCount = countRow[0]?.total_count ?? 0;
  const totalPages = Math.ceil(totalCount / perPage);

  // Format and map results
  const formattedResults: HistoryEntry[] = historyRows.map(row => ({
    name: row.name,
    status: row.status,
    time: new Date(row.updatedAt),
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

// Function to Update Employee Status by Name using Raw SQL
export const legacyUpdateEmployeeStatusByName = async (technicians: { name: string, status: string }[]) => {
  try {
    // Prepare and execute the queries for each technician
    for (const technician of technicians) {
      const { name, status } = technician;
      const utcdate: Date = new Date();
      const query = sql`
        UPDATE users
        SET status = ${status}, updatedAt = ${utcdate}
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
