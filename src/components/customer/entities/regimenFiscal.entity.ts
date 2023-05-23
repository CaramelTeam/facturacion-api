import { Column, CreateDateColumn, DeleteDateColumn, Entity,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { cfdi_regimenE } from "./cfdi_regimen.entity";
@Entity({name: 'regimenFiscal'})

export class regimenFiscalE {
 
    @PrimaryGeneratedColumn()
    id:number; //

    @Column({length:255})
    clave:string;//

    @Column({length:255})
    description:string;//rfc

    @OneToMany(() => cfdi_regimenE, cfdi_regimen => cfdi_regimen)
    cfdi_regimenE : cfdi_regimenE[]
}
