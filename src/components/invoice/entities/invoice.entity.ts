import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CancellationStatus, InvoiceType, PaymentForm } from "../types/invoice.types";

@Entity({ name: 'invoice' })
export class InvoiceE {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customerId: number;

    @Column({default: false})
    livemode: boolean;

    @Column({default: CancellationStatus.NONE})
    cancellation_status: CancellationStatus

    @Column()
    verification_url: string;

    @Column({default: 'now()'})
    expidition_date: Date;

    @Column({nullable: true, default: null})
    cancellation_receipt: string;

    @Column()
    type: InvoiceType;

    // @Column({type: 'double', precision: 10, scale: 2})
    @Column({type: 'double'})
    total: number;

    @Column()
    fiscal_folio: string;

    @Column()
    series: string;

    @Column()
    payment_form: PaymentForm;

    @Column({nullable: true})
    expiration_date: Date;

    @Column({nullable: true})
    related_documents: string;

    @Column({type: 'json'})
    stamp: object;  

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
