import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Gender, UserFormData } from '../types/user';

interface UserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
}

function UserDialog({ isOpen, onClose, onSubmit }: UserDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  const onSubmitForm = (data: UserFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-medium">
                    Add New User
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit(onSubmitForm)}
                  className="mt-4 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        {...register('firstName', { required: true })}
                        className="mt-1 block w-full rounded-md border-1 border-gray-500 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">Required</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        {...register('lastName', { required: true })}
                        className="mt-1 block w-full rounded-md border-1 border-gray-500 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">Required</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className="mt-1 block w-full rounded-md border-1 border-gray-500 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        Valid email required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      {...register('gender', { required: true })}
                      className="mt-1 block w-full rounded-md border-1 border-gray-500 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select gender</option>
                      {(['male', 'female', 'other'] as Gender[]).map((gender) => (
                        <option key={gender} value={gender}>
                          {gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </option>
                      ))}
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-xs text-red-600">Required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      {...register('shortDescription', {
                        required: true,
                        maxLength: 200,
                      })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-1 border-gray-500 p-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                    {errors.shortDescription && (
                      <p className="mt-1 text-xs text-red-600">
                        Required (max 200 characters)
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default UserDialog;
