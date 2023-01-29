import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTableUser1674980524499 implements MigrationInterface {

    private readonly realName = "users"
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table({
            name: this.realName,
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
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "lastname",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "prefixPhone",
                    type: "varchar",
                    length: "5"
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "25"
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
