export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  description: string;
}

export type UserFormData = Omit<User, 'id'>;