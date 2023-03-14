import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserE {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    email: string;

    @Exclude()
    @Column({ length: 255 })
    password: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    lastname: string;

    @Column({ length: 5 })
    prefixPhone: string;

    @Column({ length: 25 })
    phone: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }


    constructor(partial: Partial<UserE>) {
        Object.assign(this, partial);
    }
}
