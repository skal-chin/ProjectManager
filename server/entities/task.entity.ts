import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  deadline: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  isComplete: Boolean;

  @Column({ nullable: true })
  assignedTo: string;

  @Column({ nullable: false })
  projectId: number;

}
