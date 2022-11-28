import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { Allow, Ctx, RequestContext, Permission } from "@vendure/core";
import { Blog } from "../entities/blog.entity";
import { slugify } from "../helpers";

@Resolver("Blog")
export class AddBlogResolver {
  private readonly relations = ["image", "user"];
  private readonly blogRepo: any;

  constructor(@InjectConnection() private connection: Connection) {
    this.blogRepo = this.connection.getRepository(Blog);
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async addBlog(@Ctx() ctx: RequestContext, @Args() args: any) {
    const body = {
      ...args.input,
      ...{
        slug: slugify(args.input?.slug ?? args.input?.name),
        metaName: args.input?.metaName ?? args.input?.name,
        user: ctx.session?.user?.id || null
      },
    };

    const blogCreated = await this.blogRepo.insert({ ...body });
    const blog = await this.blogRepo.findOne({ id: blogCreated.raw.insertId }, {relations: this.relations});
    return blog;
  }
}
