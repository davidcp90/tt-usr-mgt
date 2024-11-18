import { useState, useEffect } from 'react';
import { User, UserFormData } from '../types/user';
import { createUser, deleteUser, getUsers } from '../api/users';
import UserDialog from '../components/UserDialog';
import UserTable from '../components/UserTable';
import { UserPlus } from 'lucide-react';

function UserManagement(): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async (): Promise<void> => {
    try {
      const data: User[] = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(`Failed to load users. Details: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (data: UserFormData): Promise<void> => {
    try {
      const newUser: User = await createUser(data);
      setUsers((prev) => [...prev, newUser]);
      setError(null);
    } catch (err) {
      setError(`Failed to create user. Details: ${err}`);
    }
  };

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setError(null);
    } catch (err) {
      setError(`Failed to delete user. Details: ${err}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-4 py-8">
      <div className="sm:flex sm:items-center">
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center rounded-md bg-cyan-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-cyan-700"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </button>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Loading users...</p>
          </div>
        ) : users.length > 0 ? (
          <UserTable users={users} onRemove={handleDeleteUser} />
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No users yet.</p>
            <p className="text-sm text-gray-500">
              Click the Add User button to get started.
            </p>
          </div>
        )}
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}

export default UserManagement;
