import { NgModule } from "@angular/core";
import { addNavMenuSection } from "@vendure/admin-ui/core";
import { BlogsSharedModule } from "./blogs-shared.module";

@NgModule({
  imports: [BlogsSharedModule],
  providers: [
    addNavMenuSection(
      {
        id: "blogs",
        label: "Blogs",
        items: [
          {
            id: "blogs-list",
            label: "Blogs list",
            routerLink: ["extensions", "blogs"],
            icon: "book",
          },
        ],
      },
      "settings"
    ),
  ],
  exports: [],
})
export class BlogsUiExtensionModule {}
