import { db } from '~/server/db';

export default async function Techs_Table() {

  const employees = await db.query.users.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString("en-US",
      {hour: "numeric", minute: "numeric",});
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${time} - ${month} ${day}`;
  }

  return (
    <table className="w-5/6 m-auto text-center border-collapse text-[42px]">
      <thead className="bg-gradient-to-br from-[#212121] to-[#333333]">
        <tr>
          <th className="p-5 border border-[#3e4446] text-[48px]"/>
          <th className="p-2 border border-[#3e4446] text-[48px]">
            Name
          </th>
          <th className="p-2 border border-[#3e4446] text-[48px]">
            Status
          </th>
          <th className="p-2 border border-[#3e4446] text-[48px]">
            Updated At
          </th>
        </tr>
      </thead>
      <tbody>
          {employees.map((employee) => (
            <tr className="even:bg-gradient-to-bl from-[#222222] to-[#232323]" key={employee.id}>
              <td className="p-1 border border-[#3e4446]">
                <input type="checkbox"/>
              </td>
              <td className="p-1 border border-[#3e4446]">{employee.name}</td>
              <td className="p-1 border border-[#3e4446]">{employee.status}</td>
              <td className="p-1 border border-[#3e4446]">{formatTime(employee.updatedAt)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
