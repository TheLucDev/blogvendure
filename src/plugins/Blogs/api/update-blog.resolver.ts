import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { Allow, Ctx, RequestContext, Permission } from "@vendure/core";
import { Blog } from "../entities/blog.entity";
import { randomText, slugify } from "../helpers";

@Resolver("Blog")
export class UpdateBlogResolver {
  private readonly relations = ["image", "user"];
  private readonly blogRepo: any;

  constructor(@InjectConnection() private connection: Connection) {
    this.blogRepo = this.connection.getRepository(Blog);
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async updateBlog(@Ctx() ctx: RequestContext, @Args() args: any) {
    const checkBlog = await this.blogRepo.findOne({ id: args.input?.id });

    if (!checkBlog) {
      throw new Error(`Blog not found`);
    }

    let body = {
      ...checkBlog,
      ...args.input,
    };

    if (args.input?.slug) {
      body = { ...body, ...{ slug: slugify(args.input?.slug) } };
    } else {
      body = { ...body, ...{ slug: slugify(body?.name ?? randomText(10)) } };
    }

    await this.blogRepo.update(
      { id: args.input?.id },
      body
    );

    const blog = await this.blogRepo.findOne({ id: args.input?.id }, {relations: this.relations});
    return blog;
  }
}
