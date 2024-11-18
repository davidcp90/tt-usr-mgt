import { Info, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { User } from '../types/user';

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

export function UserList({ users, onDelete }: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const sortedUsers = [...users].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <ul className="divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-3">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {user.lastName}, {user.firstName}
                  </p>
                  <div className="relative group">
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                      {user.description}
                    </div>
                  </div>
                </div>
                <div className="mt-1 flex items-center space-x-3">
                  <p className="truncate text-sm text-gray-500">{user.email}</p>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize bg-blue-100 text-blue-800">
                    {user.gender}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(user.id)}
                className="ml-4 flex-shrink-0 rounded-full p-1 hover:bg-red-100 group"
              >
                <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}