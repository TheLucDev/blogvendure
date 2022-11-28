import { Args, Resolver, ResolveField } from "@nestjs/graphql";
import { Ctx, ListQueryBuilder, RequestContext } from "@vendure/core";
import { Blog } from "../entities/blog.entity";

@Resolver("Query")
export class ListBlogResolver {
  private readonly relations = ["image", "user"];

  constructor(private listQueryBuilder: ListQueryBuilder) {}

  @ResolveField()
  async blogs(@Ctx() ctx: RequestContext, @Args() args: any) {
    const sql = this.listQueryBuilder.build(Blog, args.options || undefined, {
      relations: this.relations,
      where: { deletedAt: null },
      ctx,
    });

    return sql
      .getManyAndCount()
      .then(([items, totalItems]) => ({ items, totalItems }));
  }
}
