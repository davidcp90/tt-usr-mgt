import { Gender } from '../dto/create-user.dto';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  description: string;
}