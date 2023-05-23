import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { CancellationStatus, InvoiceType, PaymentForm, PaymentStatus } from "../types/invoice.types";
import { ProductInvoiceE } from "./productInvoice.entity";

@Entity({ name: 'invoice' })
export class InvoiceE {

    @PrimaryColumn()
    id: string;

    @Column()
    customerId: number;

    @Column({ default: false })
    livemode: boolean;

    @Column({ default: CancellationStatus.NONE })
    cancellation_status: CancellationStatus

    @Column()
    verification_url: string;

    @Column({ transformer: { to: (value: Date) => value, from: (value: Date) => (!value ? null : value.toLocaleString('en-US')) } })
    expidition_date: Date;

    @Column({ nullable: true, default: null })
    cancellation_receipt: string;

    @Column()
    type: InvoiceType;

    // @Column({type: 'double', precision: 10, scale: 2})
    @Column({ type: 'double' })
    total: number;

    @Column()
    fiscal_folio: string;

    @Column()
    series: string;

    @Column()
    payment_form: PaymentForm;

    @Column({ default: PaymentStatus.PENDING })
    payment_status: PaymentStatus

    @Column({ nullable: true })
    expiration_date: Date;

    @Column({ nullable: true })
    related_documents: string;

    @Column()
    folio_number: number;

    @Column()
    createdBy: number;

    @Column({ type: 'json' })
    stamp: object;

    @Column()
    cancellation_uuid: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    url_files: string;

    @OneToMany(() => ProductInvoiceE, productInvoice => productInvoice.invoice, { cascade: true })
    items: ProductInvoiceE[];

    // @OneToMany(() => InvoiceE, invoice => invoice.id)
    // invoice: ;

}
