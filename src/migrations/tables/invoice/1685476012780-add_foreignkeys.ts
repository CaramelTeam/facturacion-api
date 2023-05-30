import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class addForeignkeys1685476012780 implements MigrationInterface {

    private realName = 'invoice'
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`ALTER TABLE ${this.realName} MODIFY COLUMN customerId varchar(255)`)

        await queryRunner.createForeignKey(
            this.realName,
            new TableForeignKey({
                columnNames: ['customerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'customers',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName);
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('customerId') !== -1);
        await queryRunner.dropForeignKey(this.realName, foreignKey);
    }

}
