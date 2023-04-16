import { CancellationStatus, InvoiceType, PaymentForm, PaymentStatus } from "../../../components/invoice/types/invoice.types"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createInvoiceTable1680743916993 implements MigrationInterface {

    private realName = 'invoice'
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableSchema = new Table({
            name: this.realName,
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'customerId',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'livemode',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'cancellation_status',
                    type: 'enum',
                    enum: Object.values(CancellationStatus)
                },
                {
                    name: 'verification_url',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'expidition_date',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'cancellation_receipt',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: Object.values(InvoiceType)
                },
                {
                    name: 'total',
                    type: 'double(10,2)',
                },
                {
                    name: 'fiscal_folio',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'series',
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'payment_form',
                    type: 'enum',
                    enum: Object.values(PaymentForm)
                },
                {
                    name: 'payment_status',
                    type: 'enum',
                    enum: Object.values(PaymentStatus),
                    isNullable: false
                },
                {
                    name: 'expiration_date',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'related_documents', //Folio fiscal de la factura relacionada
                    type: 'varchar',
                    length: '255',
                    isNullable: true
                },
                {
                    name: 'folio_number',
                    type: 'int',
                    unsigned: true,
                },
                {
                    name: 'createdBy',
                    type: 'int',
                    unsigned: true
                },
                {
                    name: 'stamp', //informacion sobre el timbre fiscal
                    type: 'json'
                },
                {
                    name: 'cancellation_uuid',
                    type: 'varchar',
                    length: '255',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.realName);
        if (table) await queryRunner.dropTable(this.realName);  
    }

}
