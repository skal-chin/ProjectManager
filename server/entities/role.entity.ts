import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { UserRole } from './user_role.entity';

// Make sure to add aditional roles here then reseed
export enum RoleKey {
  ADMIN = 'admin',
  USER = 'user',
  OWNER = 'owner',
  CONTRIBUTOR = 'contributor',
}

@Entity()
export class Role {
  static ROLES = [RoleKey.ADMIN, RoleKey.USER, RoleKey.OWNER, RoleKey.CONTRIBUTOR];

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: RoleKey;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
