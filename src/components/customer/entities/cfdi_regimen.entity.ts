import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { cfdiE } from "./cfdi.entity";
import { regimenFiscalE } from "./regimenFiscal.entity";
@Entity({ name: 'cfdi_regimen' })

export class cfdi_regimenE {

    @PrimaryGeneratedColumn()
    id: number; //

    @Column()
    idcfdi: number;//

    @Column()
    idregimen: number;//rfc

    @ManyToOne(() => cfdiE, cfdi => cfdi)
    @JoinColumn({ name: "idcfdi" })
    cfdi: cfdiE

    @ManyToOne(() => regimenFiscalE, regimenFiscal => regimenFiscal)
    @JoinColumn({ name: "idregimen" })
    regimenFiscalE: regimenFiscalE

}
