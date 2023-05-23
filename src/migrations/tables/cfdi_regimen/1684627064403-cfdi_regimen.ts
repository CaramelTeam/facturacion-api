import { MigrationInterface, QueryRunner , Table, TableForeignKey} from "typeorm"

export class cfdiRegimen1684627064403 implements MigrationInterface {

    private readonly realName = 'cfdi_regimen';

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
                    name: 'idcfdi',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'idregimen',
                    type: 'int',
                    unsigned: true
                }
            ]
        })

        await queryRunner.createTable(tableSchema, true)
        await queryRunner.query(`ALTER TABLE ${this.realName} CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`)

        await queryRunner.createForeignKey(this.realName , new TableForeignKey ({
            columnNames : ["idcfdi"],
            referencedColumnNames :["id"],
            referencedTableName: "cfdi",
        }))

        await queryRunner.createForeignKey(this.realName , new TableForeignKey ({
            columnNames : ["idregimen"],
            referencedColumnNames :["id"],
            referencedTableName: "regimenFiscal",
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName);
        
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('idcfdi') !== -1);
        if (foreignKey) await queryRunner.dropForeignKey(this.realName, foreignKey);

        const foreignKey2 = table.foreignKeys.find(fk => fk.columnNames.indexOf('idregimen') !== -1);
        if (foreignKey2) await queryRunner.dropForeignKey(this.realName,foreignKey2);


        if (table) await queryRunner.dropTable(this.realName);
    }

}
