import { User } from '../entities/user';

/* Defining the interface for the UserRepository. */
export interface UserRepository {
  createOne(user: User): Promise<User>;
  findOne(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  updateOne(user: User): Promise<User>;
  deleteOne(id: string): Promise<boolean>;
}
