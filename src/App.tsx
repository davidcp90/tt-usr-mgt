import { UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { UserDialog } from './components/UserDialog';
import { UserList } from './components/UserList';
import { User, UserFormData } from './types/user';
import { createUser, deleteUser, getUsers } from './api/users';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      const newUser = await createUser(data);
      setUsers((prev) => [...prev, newUser]);
      setError(null);
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">
              User Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in your organization including their name, email,
              and gender.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </button>
          </div>
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
            <UserList users={users} onDelete={handleDeleteUser} />
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-500">No users yet.</p>
              <p className="text-sm text-gray-500">
                Click the Add User button to get started.
              </p>
            </div>
          )}
        </div>
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  );
}

export default App;