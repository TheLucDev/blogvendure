import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BlogsListComponent } from "./components/blog-list/blogs-list.component";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BlogDetailComponent } from "./components/blog-detail/blogs-detail.component";
import { BlogDetailResolver } from "./providers/routing/blogs-detail-resolver";
import { BlogsSharedModule } from "./blogs-shared.module";

@NgModule({
  imports: [
    BlogsSharedModule,
    RouterModule.forChild([
      {
        path: "",
        pathMatch: "full",
        component: BlogsListComponent,
        data: {
          breadcrumb: [
            {
              label: "Blogs",
              link: ["/blogs"],
            },
          ],
        },
      },
      {
        path: ":id",
        component: BlogDetailComponent,
        resolve: { entity: BlogDetailResolver },
        data: { breadcrumb: blogDetailBreadcrumb },
      },
    ]),
  ],
  declarations: [BlogsListComponent, BlogDetailComponent],
  providers: [BlogDetailResolver],
})
export class BlogsUiLazyModule {}

export function blogDetailBreadcrumb(resolved: {
  entity: Observable<any>;
}): any {
  return resolved.entity.pipe(
    map((entity: any) => [
      {
        label: "Blog",
        link: ["/extensions", "blogs"],
      },
      {
        label: `${entity.id}`,
        link: [],
      },
    ])
  );
}
