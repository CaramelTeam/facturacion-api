import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class customer1679792886201 implements MigrationInterface {

    private readonly realName = "customers"

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table ({
            name : this.realName,
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    unsigned: true
                },
                {
                    name: "legal_name",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "tax_id",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "tax_system",
                    type: "varchar",
                    length: "3",
    
                },
                {
                    name: "tax_system",
                    type: "varchar",
                    length: "3",
                },
                {
                    name: "tax_system",
                    type: "varchar",
                    length: "3",
                },
            ]

        })
        await queryRunner.createTable(tableSchema, true)
        await queryRunner.query(`ALTER TABLE ${this.realName} CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName)
        if (table) {
            await queryRunner.dropTable(this.realName)
        }
    }

}
