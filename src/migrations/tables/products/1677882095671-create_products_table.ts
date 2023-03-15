import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createProductsTable1677882095671 implements MigrationInterface {

    private readonly realName = 'products';
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table({
            name: this.realName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'price',
                    type: 'decimal',
                },
                {
                    name: 'productKey',
                    type: 'int',
                    isNullable: false
                },
                {
                    name: 'unitKey',
                    type: 'varchar',
                    length: '6',
                },
                {
                    name: 'unitName',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        })

        await queryRunner.createTable(tableSchema, true)
        await queryRunner.query(`ALTER TABLE ${this.realName} CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName);
        if (table) await queryRunner.dropTable(this.realName);
    }

}
