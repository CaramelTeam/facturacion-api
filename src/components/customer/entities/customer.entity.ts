import { InvoiceE } from "src/components/invoice/entities/invoice.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({ name: 'customers' })

export class CustomerE {

    @PrimaryColumn()
    id: string; //

    @Column({ length: 255 })
    legal_name: string;//

    @Column({ length: 255 })
    tax_id: string;//rfc

    @Column({ length: 3 })
    tax_system: string; //

    @Column({ length: 6 })
    zip: string;

    @Column({ length: 255 })
    street: string;

    @Column({ length: 5 })
    exterior: string;

    @Column({ length: 5 })
    interior: string;

    @Column({ length: 255 })
    neighborhood: string;

    @Column({ length: 255 })
    city: string;

    @Column({ length: 255 })
    municipality: string;

    @Column({ length: 255 })
    state: string;

    @Column({ length: 255 })
    country: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 10 })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => InvoiceE, invoice => invoice.owner)
    invoices: InvoiceE[];
}
