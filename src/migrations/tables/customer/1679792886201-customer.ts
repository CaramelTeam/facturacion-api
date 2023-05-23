import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class customer1679792886201 implements MigrationInterface {

    private readonly realName = "customers"

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table ({
            name : this.realName,
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    length: "255"
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
                    name: "zip",
                    type: "varchar",
                    length: "6",
    
                },
                {
                    name: "street",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "exterior",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "interior",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "neighborhood",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "city",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "municipality",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "state",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "country",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true
                }
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


