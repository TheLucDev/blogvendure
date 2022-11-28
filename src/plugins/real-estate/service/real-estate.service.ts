import { Injectable, Inject } from "@nestjs/common";
import { ListQueryBuilder, TransactionalConnection } from "@vendure/core";
import { DeepPartial } from "typeorm";
import { RealEstate } from "../entities/real-estate.entity";
import { ListQueryOptions } from "@vendure/core/dist/common/types/common-types";

@Injectable()
export class RealEstateService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder
  ) {}
  async getAllRealEstates(ctx: any, options?: ListQueryOptions<RealEstate>) {
    return this.listQueryBuilder
      .build(RealEstate, options)
      .getManyAndCount()
      .then(([realEstates, totalItems]) => {
        return {
          items: realEstates,
          totalItems,
        };
      });
  }
  async deleteSingleRealEstate(ctx: any, id: any) {
    const Variants = await this.connection.getEntityOrThrow(
      ctx,
      RealEstate,
      id
    );
    await this.connection.getRepository(ctx, RealEstate).delete(Variants.id);
    return Variants;
  }

  async getRealEstateById(ctx: any, data: any) {
    return this.connection.getEntityOrThrow(ctx, RealEstate, data);
  }

  async addSingleRealEstate(ctx: any, data: DeepPartial<RealEstate>[]) {
    const createdVariant = await this.connection
      .getRepository(ctx, RealEstate)
      .create(data);
    const savedVariant = await this.connection
      .getRepository(ctx, RealEstate)
      .save(createdVariant);
    return savedVariant;
  }

  async updateSingleRealEstate(ctx: any, data: any) {
    const createdVariant = await this.connection
      .getRepository(ctx, RealEstate)
      .update(data.id, {
        projectName: data.projectName || "None",
        descriptions: data.descriptions || "None",
        price: data.price || 0,
        address: data.address || "None",
      });
    return this.connection.getEntityOrThrow(ctx, RealEstate, data.id);
  }
}
