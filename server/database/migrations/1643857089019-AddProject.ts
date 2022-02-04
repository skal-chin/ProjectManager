import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddProject1643857089019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project',
        columns: [
          {
            name : 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'text',
            isNullable: false,
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
            name: 'isComplete',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'ownerId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
    
    await queryRunner.createTable(
      new Table({
        name: 'user_project',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'contextId',
            type: 'text',
            isNullable: false,
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'user_project',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_project',
      new TableForeignKey({
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project');
  }
  
}