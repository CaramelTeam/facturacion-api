import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InvoiceE } from "./invoice.entity";
import { ProductE } from "../../../components/products/entities/product.entity";

@Entity({ name: 'product_invoice' })
export class ProductInvoiceE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    invoiceId: string;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => InvoiceE, invoice => invoice)
    @JoinColumn({ name: 'invoiceId' })
    invoice: InvoiceE;

    @ManyToOne(() => ProductE, product => product)
    @JoinColumn({ name: 'productId' })
    product: ProductE;

}