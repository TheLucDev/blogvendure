import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Args, Resolver, ResolveField } from "@nestjs/graphql";
import { Ctx, RequestContext } from "@vendure/core";
import { Blog } from "../entities/blog.entity";
import { FindOptionsUtils } from "typeorm";

@Resolver("Query")
export class DetailBlogResolver {
  private readonly relations = ["image", "user"];

  constructor(@InjectConnection() private connection: Connection) {}

  @ResolveField()
  async blog(@Ctx() ctx: RequestContext, @Args() args: any) {
    const qb = this.connection.getRepository(Blog).createQueryBuilder("blog");
    FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
      relations: this.relations,
    });

    FindOptionsUtils.joinEagerRelations(
      qb,
      qb.alias,
      qb.expressionMap.mainAlias!.metadata
    );
    return qb
      .andWhere("blog.deletedAt IS NULL")
      .andWhere("blog.id = :id", { id: args?.id })
      .orWhere("blog.slug = :slug", { slug: args?.slug })
      .getOne();
  }
}
