import { User } from '@prisma/client';

type UserWithoutPassword = Omit<User, 'password'>;
export class UserTransformer {
  static toUser(user: UserWithoutPassword) {
    return {
      cuid: user.cuid,
      fullname: user.fullname,
      email: user.email,
      avatar: user.avatar,
      permissions: user.permissions,
    };
  }

  static toUsers(users: User[]) {
    return users.map(this.toUser);
  }
}
