'use client';

import { useState, useEffect, useCallback } from 'react';

// Define the Employee interface to match data fetched on the server
interface Employee {
  id: number;
  name: string;
  status: string;
  updatedAt: Date;
}

export default function Table({ employees }: { employees: Employee[] }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [status, setStatus] = useState('');
  const [employeeData, setEmployeeData] = useState(employees);

  useEffect(() => {
    // Refresh employee data if needed after state updates
    setEmployeeData(employees);
  }, [employees]);

  const fetchEmployees = useCallback(async (): Promise<Employee[]> => {
    const res = await fetch('/api/get_employees', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });
    return res.json() as Promise<Employee[]>;
  }, []);

  useEffect(() => {
    const fetchAndUpdateEmployees = async () => {
      const updatedEmployees = await fetchEmployees();
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
  }, [fetchEmployees]);

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((prevId) => prevId !== id)
        : [...prevSelected, id]
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedIds.length > 0 && status.trim() !== '') {
      await fetch('/api/update_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({ employeeIds: selectedIds, newStatus: status }),
      });
      // Optionally refresh data on the client-side after update
      const updatedEmployees = await fetchEmployees();
      setEmployeeData(updatedEmployees);
      setSelectedIds([]);
      setStatus('');
    }
  };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSubmit();
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

  return (
    <div>
      <table className="techtable w-2/3 min-h-[600px] m-auto text-center border-collapse text-[42px]">
        <thead className="bg-gradient-to-br from-[#212121] to-[#333333]">
          <tr>
            <th className="tabletitles p-5 border border-[#3e4446] text-[48px]" />
            <th className="tabletitles p-2 border border-[#3e4446] text-[48px]">Name</th>
            <th className="tabletitles p-2 border border-[#3e4446] text-[48px]">Status</th>
            <th className="tabletitles p-2 border border-[#3e4446] text-[48px]">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr className="even:bg-gradient-to-bl from-[#222222] to-[#232323]" key={employee.id}>
              <td className="p-1 border border-[#3e4446]">
                <input
                  type="checkbox"
                  className="m-0 cursor-pointer transform scale-150"
                  checked={selectedIds.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </td>
              <td className="p-1 border border-[#3e4446]">{employee.name}</td>
              <td className="s-column p-1 border border-[#3e4446]">{employee.status}</td>
              <td className="ua-column p-1 border border-[#3e4446]">{formatTime(employee.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-auto flex flex-row items-center justify-center py-5">
        <input
          type="text"
          placeholder="New Status"
          className="min-w-[100px] p-3 border-none rounded-xl text-[#111111] md:text-xl"
          value={status}
          onChange={handleStatusChange}
          onKeyDown={handleKeyPress}
        />
        <button
          type="submit"
          className="m-2 p-3 border-none rounded-2xl text-center
            font-semibold md:text-xl hover:text-slate-300
            hover:bg-gradient-to-bl hover:from-[#484848] hover:to-[#333333]
            bg-gradient-to-br from-[#595959] to-[#444444]"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
}