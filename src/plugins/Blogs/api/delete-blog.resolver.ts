import { InjectConnection } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { Allow, Ctx, RequestContext, Permission } from "@vendure/core";
import { Blog } from "../entities/blog.entity";
import { DeletionResult } from "@vendure/common/lib/generated-types";

@Resolver("Blog")
export class DeleteBlogResolver {
  blogRepo: any;

  constructor(@InjectConnection() private connection: Connection) {
    this.blogRepo = this.connection.getRepository(Blog);
  }

  @Mutation()
  @Allow(Permission.SuperAdmin)
  async deleteBlog(@Ctx() ctx: RequestContext, @Args() args: any) {
    const checkBlog = await this.blogRepo.findOne({ id: args.id });
    if (!checkBlog) {
      throw new Error(`Blog not found`);
    }

    this.blogRepo.delete({ id: args.id });

    let message = "Blog deleted successfully";
    let result: DeletionResult;
    result = DeletionResult.DELETED;
    return {
      result,
      message,
    };
  }
}
