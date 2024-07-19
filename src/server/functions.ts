import "server-only";
import { db } from "~/server/db";
import { sql } from "drizzle-orm";

// Function to Get Employees
export const getEmployees = async () => {
  return await db.query.users.findMany({
    orderBy: (model, { asc }) => asc(model.id),
  });
};

// Function to Update Employee Status using Raw SQL
export const updateEmployeeStatus = async (employeeIds: number[], newStatus: string) => {
  try {
    // Convert array of ids to a format suitable for SQL query (comma-separated string)
    const idString = employeeIds.join(",");

    // Prepare the raw SQL query with embedded variables
    const query = `
      UPDATE users
      SET status = '${newStatus}', updatedAt = '${new Date().toISOString()}'
      WHERE id IN (${idString})
    `;

    // Execute the raw SQL query using the execute method
    await db.execute(sql`${query}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating employee status:", error);
    throw new Error("Failed to update status");
  }
};
