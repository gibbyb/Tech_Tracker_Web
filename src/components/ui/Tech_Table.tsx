"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import Loading from "~/components/ui/Loading";
import { useTVMode } from "~/components/context/TVModeContext";
import { Drawer, DrawerTrigger } from "~/components/ui/shadcn/drawer";
import History_Drawer from "~/components/ui/History_Drawer";

type Employee = {
  id: number;
  name: string;
  status: string;
  updatedAt: Date;
}

export default function Tech_Table({ employees }: { employees: Employee[] }) {
  const { data: session, status } = useSession();
  const { tvMode } = useTVMode();
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [employeeStatus, setStatus] = useState('');
  const [employeeData, setEmployeeData] = useState(employees);

  const fetch_employees = useCallback(async (): Promise<Employee[]> => {
    const res = await fetch('/api/technicians', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });
    return res.json() as Promise<Employee[]>;
  }, []);

  const update_status = async () => {
    if (!session) {
      alert("You must be signed in to update status.");
      return;
    } else if (selectedIds.length === 0 && employeeStatus.trim() !== '') {
      const users_name = session.user?.name ?? "";
      const name_arr = users_name.split(' ');
      const lname = name_arr[name_arr.length - 1] ?? "";
      const cur_user = employees.find(employee => employee.name.includes(lname));
      if (cur_user) {
        await fetch('/api/update_status_by_id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
          },
          body: JSON.stringify({ employeeIds: [cur_user.id], newStatus: employeeStatus }),
        });
      }
    } else if (employeeStatus.trim() !== '') {
      await fetch('/api/update_status_by_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({ employeeIds: selectedIds, newStatus: employeeStatus }),
      });
    }
    
    const updatedEmployees = await fetch_employees();
    setEmployeeData(updatedEmployees);
    setSelectedIds([]);
    setStatus('');
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((prevId) => prevId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allIds = employees.map((employee) => employee.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await update_status();
    }
  };

  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${time} - ${month} ${day}`;
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  useEffect(() => {
    const fetchAndUpdateEmployees = async () => {
      const updatedEmployees = await fetch_employees();
      setEmployeeData(updatedEmployees);
    };
    
    fetchAndUpdateEmployees().catch((error) => {
      console.error('Error fetching employees:', error);
    });

    const intervalId = setInterval(() => {
      (async () => {
        await fetchAndUpdateEmployees();
      })().catch((error) => {
        console.error('Error fetching employees:', error);
      });
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [fetch_employees]);

  useEffect(() => {
    if (selectedIds.length === employeeData.length && employeeData.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedIds, employeeData]);

  if (loading) return <Loading interval_amount={3} />;
  else {
    return (
      <div className={`${tvMode ? 'content-fullscreen' : ''}`}>
        {tvMode && <div className="w-full tablefill"></div>}
        <table className={`techtable m-auto text-center text-[42px]
          ${tvMode ? 'techtable-fullscreen' : 'w-5/6'}`}>
          <thead className="tabletitles border border-[#3e4446] bg-gradient-to-b
            from-[#282828] to-[#383838] text-[48px]">
            <tr>
              {!tvMode && (
                <th className="py-3 px-6 border border-[#3e4446]">
                  <input
                    type="checkbox"
                    className="m-auto cursor-pointer scale-150"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                  />
                </th>
              )}
              <th className="border border-[#3e4446] py-3">Name</th>
              <th className="border border-[#3e4446] py-3">
                <Drawer>
                  <DrawerTrigger>Status</DrawerTrigger>
                    <History_Drawer />
                </Drawer>
              </th>
              <th className="border border-[#3e4446] py-3">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr
                className="even:bg-gradient-to-br from-[#272727] to-[#313131]
                  odd:bg-gradient-to-bl odd:from-[#252525] odd:to-[#212125]"
                key={employee.id}
              >
              {!tvMode && (
                <td className="p-1 border border-[#3e4446]">
                  <input
                    type="checkbox"
                    className="m-auto cursor-pointer scale-150"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
              )}
                <td className="n-column px-1 md:py-3 border border-[#3e4446]">
                  {employee.name}
                </td>
                <td className="s-column max-w-[700px] px-1 md:py-3 border border-[#3e4446]">
                  <button>
                    {employee.status}
                  </button>
                </td>
                <td className="ua-column px-1 md:py-3 border border-[#3e4446]">
                  {formatTime(employee.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!tvMode && (
          <div className="m-auto flex flex-row items-center justify-center py-5">
            <input
              autoFocus
              type="text"
              placeholder="New Status"
              className="min-w-[120px] lg:min-w-[400px] bg-[#F9F6EE] py-2 px-3
                border-none rounded-xl text-[#111111] lg:text-2xl"
              value={employeeStatus}
              onChange={handleStatusChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="min-w-[100px] lg:min-w-[160px] m-2 p-2 border-none rounded-xl
                text-center font-semibold lg:text-2xl hover:text-slate-300
                hover:bg-gradient-to-bl hover:from-[#484848] hover:to-[#333333]
                bg-gradient-to-br from-[#595959] to-[#444444]"
              onClick={update_status}
            >
              Update
            </button>
          </div>
        )}
      </div>
    );
  }
}
