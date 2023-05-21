import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class alterTableAddCollumnUrl1684695959410 implements MigrationInterface {

    private readonly realName = 'invoice'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(this.realName,
            new TableColumn(
                {
                    name: 'url_files',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                }
            ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName)
        if (table) await queryRunner.dropColumn(this.realName, 'url_files')
    }

}
