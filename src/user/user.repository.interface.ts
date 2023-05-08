import { UserEntity } from './entities/user.entity';

export interface UserRepositoryInterface {
  findByUsername(username: string): Promise<UserEntity | null>;
}
