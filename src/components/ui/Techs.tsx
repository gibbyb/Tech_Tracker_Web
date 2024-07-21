import { getEmployees } from "~/server/functions";
import Table from "~/components/ui/Table";

export default async function Techs() {

  const employees = await getEmployees();
  return <Table employees={employees}/>;
};
