import { Args, Parent, Query, Resolver, Mutation } from "@nestjs/graphql";
import { RealEstateService } from "../service/real-estate.service";
import {
  RequestContext,
  Ctx,
  Allow,
  Permission,
  Transaction,
} from "@vendure/core";

@Resolver()
export class RealEstateAdminResolver {
  constructor(private RealEstateService: RealEstateService) {}

  @Query()
  @Allow(Permission.SuperAdmin)
  RealEstate(@Ctx() ctx: RequestContext, @Args() args: any) {
    const { id } = args;
    return this.RealEstateService.getRealEstateById(ctx, id);
  }
  @Query()
  @Allow(Permission.SuperAdmin)
  RealEstates(@Ctx() ctx: RequestContext, @Args() args: any) {
    const { options } = args;
    return this.RealEstateService.getAllRealEstates(ctx, options || undefined);
  }

  @Transaction()
  @Mutation()
  @Allow(Permission.SuperAdmin)
  addRealEstate(@Ctx() ctx: RequestContext, @Args() args: any) {
    const { input } = args;
    return this.RealEstateService.addSingleRealEstate(ctx, input);
  }

  @Transaction()
  @Mutation()
  @Allow(Permission.SuperAdmin)
  updateRealEstate(@Ctx() ctx: RequestContext, @Args() args: any) {
    const { input } = args;
    return this.RealEstateService.updateSingleRealEstate(ctx, input);
  }
  @Transaction()
  @Mutation()
  @Allow(Permission.SuperAdmin)
  deleteRealEstate(@Ctx() ctx: RequestContext, @Args() args: any) {
    const { input } = args;
    return this.RealEstateService.deleteSingleRealEstate(ctx, input);
  }
}
