'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import Loading from "~/components/ui/Loading";

// Define the Employee interface to match data fetched on the server
interface Employee {
  id: number;
  name: string;
  status: string;
  updatedAt: Date;
}

export default function Table({ employees }: { employees: Employee[] }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [employeeStatus, setStatus] = useState('');
  const [employeeData, setEmployeeData] = useState(employees);

  const fetch_employees = useCallback(async (): Promise<Employee[]> => {
    const res = await fetch('/api/v2/get_employees', {
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
    }
    // If no employee is selected and status is not empty
    if (selectedIds.length === 0 && employeeStatus.trim() !== '') {
      const cur_user = employees.find(employee => employee.name === session.user?.name);
      if (cur_user) {
        await fetch('/api/v2/update_status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.API_KEY}`
          },
          body: JSON.stringify({ employeeIds: [cur_user.id], newStatus: employeeStatus }),
        });
      }
    } else if (employeeStatus.trim() !== '') {
      await fetch('/api/v2/update_status', {
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
      // if key is i then focus text input
    }
  };

  // Format time for display
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

  // Loading bar while we wait for auth
  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
    }, [status]);

  // Refresh employee data if needed after state updates
  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

  // Fetch employees from the server every 10 seconds
  useEffect(() => {
    const fetchAndUpdateEmployees = async () => {
      const updatedEmployees = await fetch_employees();
      setEmployeeData(updatedEmployees);
    };
    fetchAndUpdateEmployees()
    .catch((error) => {
      console.error('Error fetching employees:', error);
    });
    const intervalId = setInterval(() => {
      (async () => {
        await fetchAndUpdateEmployees();
      })()
      .catch((error) => {
        console.error('Error fetching employees:', error);
      });
    }, 10000);  // Poll every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [fetch_employees]);

  // Handle checkbox changes
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
      <div>
        <table className="techtable rounded-2xl w-5/6 m-auto text-center text-[42px]">
          <thead className="tabletitles border border-[#3e4446]
            bg-gradient-to-b from-[#282828] to-[#383838] text-[48px]">
            <tr>
              <th className="py-3 px-4 border border-[#3e4446]">
                <input
                  type="checkbox"
                  className="m-auto cursor-pointer transform scale-150"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th className="border border-[#3e4446]">Name</th>
              <th className="border border-[#3e4446]">Status</th>
              <th className="border border-[#3e4446]">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr className="even:bg-gradient-to-br from-[#272727] to-[#313131]
                odd:bg-gradient-to-bl odd:from-[#252525] odd:to-[#212125]"
                key={employee.id}
              >
                <td className="p-1 border border-[#3e4446]">
                  <input
                    type="checkbox"
                    className="m-0 cursor-pointer transform scale-150"
                    checked={selectedIds.includes(employee.id)}
                    onChange={() => handleCheckboxChange(employee.id)}
                  />
                </td>
                <td className="n-column px-1 md:py-5 border border-[#3e4446]">
                  {employee.name}
                </td>
                <td className="s-column px-1 md:py-5 border border-[#3e4446]">
                  {employee.status}
                </td>
                <td className="ua-column px-1 md:py-5 border border-[#3e4446]">
                  {formatTime(employee.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="m-auto flex flex-row items-center justify-center py-5">
          <input
            autoFocus
            type="text"
            placeholder="New Status"
            className="min-w-[120px] lg:min-w-[400px] bg-[#F9F6EE]
              py-2 px-3 border-none rounded-xl text-[#111111] lg:text-2xl"
            value={employeeStatus}
            onChange={handleStatusChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="min-w-[100px] lg:min-w-[160px] m-2 p-2 border-none
              rounded-xl text-center font-semibold lg:text-2xl hover:text-slate-300
              hover:bg-gradient-to-bl hover:from-[#484848] hover:to-[#333333]
              bg-gradient-to-br from-[#595959] to-[#444444]"
            onClick={update_status}
          >
            Update
          </button>
        </div>
      </div>
    );
  }
}
