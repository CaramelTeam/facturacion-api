import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class alterTableAddPreferredCfdi1709223812459 implements MigrationInterface {

    private readonly realName = 'customers'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(this.realName,
            new TableColumn(
                {
                    name: 'preferred_cfdi',
                    type: 'varchar',
                    length: '120',
                    isNullable: true
                }
            ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName)
        if (table) await queryRunner.dropColumn(this.realName, 'preferred_cfdi')
    }

}
