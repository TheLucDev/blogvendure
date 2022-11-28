import { DeepPartial } from '@vendure/common/lib/shared-types';
import { VendureEntity } from '@vendure/core';
import { Column, Entity } from 'typeorm';

@Entity()
export class RealEstate extends VendureEntity {
    constructor(opts?: DeepPartial<RealEstate>) {
        super(opts);
    }

    @Column()
    projectName: string;

    @Column()
    descriptions: string;

    // @Column()
    // buildYear: number;
    //
    // @Column()
    // usageTime: number;
    //
    // @Column()
    // contractorsName: string;
    //
    // @Column({ length: 100 })
    // projectType: string;
    //
    // @Column()
    // purpose: string;

    @Column({ default: 0 })
    price: number;

    // @Column()
    // investorInfor: string;
    //
    // @Column()
    // facilities: string;

    @Column({ default: '' })
    address: string

}