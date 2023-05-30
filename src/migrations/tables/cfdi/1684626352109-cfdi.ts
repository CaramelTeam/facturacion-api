import { MigrationInterface, QueryRunner , Table} from "typeorm"

export class cfdi1684626352109 implements MigrationInterface {

    private readonly realName = 'cfdi';

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
                    name: 'clave',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
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
