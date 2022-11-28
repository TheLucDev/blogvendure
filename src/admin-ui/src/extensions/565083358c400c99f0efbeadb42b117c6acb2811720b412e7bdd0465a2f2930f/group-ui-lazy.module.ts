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
              label: "Blogs Group",
              link: ["/blogs-groups"],
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
export class BlogsGroupUiLazyModule {}

export function blogDetailBreadcrumb(resolved: {
  entity: Observable<any>;
}): any {
  return resolved.entity.pipe(
    map((entity: any) => [
      {
        label: "Blog Groups",
        link: ["/extensions", "blogs-groups"],
      },
      {
        label: `${entity.id}`,
        link: [],
      },
    ])
  );
}
