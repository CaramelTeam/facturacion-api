import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255, unique: true})
    email: string;

    @Column({length: 255})
    password: string;

    @Column({length: 255})
    name: string;

    @Column({length: 255})
    lastname: string;

    @Column({length: 5})
    prefixPhone: string;

    @Column({length: 25})
    phone: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @Column({type: "timestamp", nullable: true})
    deletedAt: Date;
}
