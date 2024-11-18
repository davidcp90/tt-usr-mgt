export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  shortDescription: string;
}

export type UserFormData = Omit<User, "id">;
