import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    description: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'int',  nullable: false })
    productKey: number;

    @Column({ length: 6 })
    unitKey: string;

    @Column({ length: 100 })
    unitName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
