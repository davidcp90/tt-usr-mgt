import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Trash } from 'lucide-react';
import { User } from '../types/user';

interface UserTableProps {
  users: User[];
  onRemove: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onRemove }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('lastName');

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleRequestSort('lastName')}
            >
              Full Name
              <span className="ml-2">
                {orderBy === 'lastName' ? (order === 'asc' ? '↑' : '↓') : '↑↓'}
              </span>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleRequestSort('email')}
            >
              Email
              <span className="ml-2">
                {orderBy === 'email' ? (order === 'asc' ? '↑' : '↓') : '↑↓'}
              </span>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleRequestSort('gender')}
            >
              Gender
              <span className="ml-2">
                {orderBy === 'gender' ? (order === 'asc' ? '↑' : '↓') : '↑↓'}
              </span>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              More Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {`${user.lastName}, ${user.firstName}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="tooltip" title={user.shortDescription}>
                  {user.shortDescription.slice(0, 10)}
                  {user.shortDescription.length > 10 ? '...' : ''}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    <Trash
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                      onClick={() => onRemove(user.id)}
                    />
                  </Menu.Button>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;