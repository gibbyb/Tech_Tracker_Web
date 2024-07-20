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
export const updateEmployeeStatus = async (employeeIds: string[], newStatus: string) => {
  try {
    // Convert array of ids to a format suitable for SQL query (comma-separated string)
    const idList = employeeIds.map(id => parseInt(id, 10));
    const updatedAt = new Date();

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
