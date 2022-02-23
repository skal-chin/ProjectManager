import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserProject } from './user_project.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false})
  description: string;

  @Column({ nullable: false })
  deadline: string;

  @Column({ nullable: false})
  isComplete: boolean

  @Column({ nullable: false})
  ownerId: number

  @Column({ nullable: false})
  ownerEmail: string

  @OneToMany(() => UserProject, (userProject) => userProject.project, { cascade: true})
  userProjects: UserProject[];
}