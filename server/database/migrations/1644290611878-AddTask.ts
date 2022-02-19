import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class AddTask1644290611878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: 'task',
					columns: [
						{
						name: 'id',
						isPrimary: true,
						isGenerated: true,
						type: 'int',
						},
						{
						name: 'description',
						type: 'text',
						isNullable: false,
						},
						{
						name: 'deadline',
						type: 'text',
						isNullable: false,
						},
						{
						name: 'title',
						type: 'text',
						isNullable: false,
						},
						{
						name: 'isComplete',
						type: 'boolean',
						isNullable: false,
						},
						{
						name: 'assignedTo',
						type: 'int',
						isNullable: false,
						},
						{
						name: 'projectId',
						type: 'int',
						isNullable: false,
						},
					],
				}),
			)
		}

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('task')
    }

}
