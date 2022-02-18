import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  deadline: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  isComplete: Boolean;

  @Column({ nullable: false })
  assignedTo: number;

  @Column({ nullable: false })
  projectId: number;

}
