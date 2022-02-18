import { Column, Entity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user_role.entity.ts';
import { UserProject } from './user_project.entity.ts';
import internal from 'stream';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  title: string;

  @Column({ })
  description: string;

  @Column({ })
  deadline: Date;

  @Column({ })
  id: Number;

  @Column({ })
  isComplete: Boolean;

  @Column({ })
  assignedTo: number;

  @Column({ })
  projectId: number;

  @ManyToOne(() => UserProject, (userProject) => userProject.user, { cascade: true})
  userProject: UserProject[];

  @ManyToOne(() => UserRole, (userRole) => userRole.user, { cascade: true})
  userRoles: UserRole[];
}
