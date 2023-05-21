import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class crateTableProductInvoice1684542720318 implements MigrationInterface {
    private readonly realName = 'product_invoice';

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table({
            name: this.realName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    unsigned: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'invoiceId',
                    type: 'varchar',
                },
                {
                    name: 'productId',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'quantity',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'price',
                    type: 'double(10,2)',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        })

        await queryRunner.createTable(tableSchema, true)
        await queryRunner.query(`ALTER TABLE ${this.realName} CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`)

        await queryRunner.createForeignKey(this.realName, new TableForeignKey({
            columnNames: ['invoiceId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'invoice',
        }))

        await queryRunner.createForeignKey(this.realName, new TableForeignKey({
            columnNames: ['productId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName);
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('invoiceId') !== -1);
            if (foreignKey) await queryRunner.dropForeignKey(this.realName, foreignKey);
            const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
            if (foreignKey2) await queryRunner.dropForeignKey(this.realName, foreignKey2);
            await queryRunner.dropTable(this.realName);
        }
    }

}
