'use client';

import { useState, useEffect } from 'react';

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

  const fetchEmployees = async (): Promise<Employee[]> => {
    const res = await fetch('/api/get_employees', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`
      }
    });
    return res.json() as Promise<Employee[]>;
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
      <table className="w-5/6 m-auto text-center border-collapse text-[42px]">
        <thead className="bg-gradient-to-br from-[#212121] to-[#333333]">
          <tr>
            <th className="p-5 border border-[#3e4446] text-[48px]" />
            <th className="p-2 border border-[#3e4446] text-[48px]">Name</th>
            <th className="p-2 border border-[#3e4446] text-[48px]">Status</th>
            <th className="p-2 border border-[#3e4446] text-[48px]">Updated At</th>
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
              <td className="p-1 border border-[#3e4446]">{employee.status}</td>
              <td className="p-1 border border-[#3e4446]">{formatTime(employee.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-auto flex flex-row items-center justify-center">
        <input
          type="text"
          placeholder="New Status"
          className="w-1/5 p-2 border-none rounded-md"
          value={status}
          onChange={handleStatusChange}
        />
        <button
          type="submit"
          className="m-2 px-2 py-5 border-none rounded-md text-center bg-gradient-to-br from-[#484848] to-[#333333]"
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
}
