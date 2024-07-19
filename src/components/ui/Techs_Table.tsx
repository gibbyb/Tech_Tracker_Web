//import { auth } from "~/auth";
import { getEmployees } from "~/server/functions";
import Table from "~/components/ui/Table";

//export const dynamic = "force-dynamic";

export default async function Techs_Table() {

  const employees = await getEmployees();
  return <Table employees={employees} />;
};

  //const formatTime = (timestamp: Date) => {
    //const date = new Date(timestamp);
    //const time = date.toLocaleTimeString("en-US",
      //{hour: "numeric", minute: "numeric",});
    //const day = date.getDate();
    //const month = date.toLocaleString("default", { month: "long" });
    //return `${time} - ${month} ${day}`;
  //}
  //const session = await auth();
  //const users_name = session?.user?.name;

  //return (
    //<div>
      //<table className="w-5/6 m-auto text-center border-collapse text-[42px]">
        //<thead className="bg-gradient-to-br from-[#121212] to-[#333333]">
          //<tr>
            //<th className="p-5 border border-[#3e4446] text-[48px]"/>
            //<th className="p-2 border border-[#3e4446] text-[48px]">
              //Name
            //</th>
            //<th className="p-2 border border-[#3e4446] text-[48px]">
              //Status
            //</th>
            //<th className="p-2 border border-[#3e4446] text-[48px]">
              //Updated At
            //</th>
          //</tr>
        //</thead>
        //<tbody>
            //{employees.map((employee) => (
              //<tr className="even:bg-gradient-to-bl from-[#222222] to-[#323232]" key={employee.id}>
                //<td className="p-1 border border-[#3e4446]">
                  //<input type="checkbox"
                    //className="m-0 cursor-pointer transform scale-150"
                    ////checked={}
                  ///>
                //</td>
                //<td className="p-1 border border-[#3e4446]">{employee.name}</td>
                //<td className="p-1 border border-[#3e4446]">{employee.status}</td>
                //<td className="p-1 border border-[#3e4446]">{formatTime(employee.updatedAt)}</td>
              //</tr>
            //))}
        //</tbody>
      //</table>
      //<div className="m-auto flex flex-row items-center justify-center">
        //<input type="text" placeholder="New Status"
          //className="w-1/5 p-2 border-none rounded-xl"
          ////value={}
        ///>
        //<button type="submit"
          //className="m-2 p-3 border-none rounded-2xl text-center bg-gradient-to-br from-[#484848] to-[#333333]"
        //>
          //Update
        //</button>
      //</div>
    //</div>
  //);
//};
