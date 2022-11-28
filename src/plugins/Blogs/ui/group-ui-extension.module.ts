import { NgModule } from "@angular/core";
import { addNavMenuSection } from "@vendure/admin-ui/core";
import { BlogsSharedModule } from "./blogs-shared.module";

@NgModule({
  imports: [BlogsSharedModule],
  providers: [
    addNavMenuSection(
      {
        id: "blogs-groups",
        label: "Blogs Groups",
        items: [
          {
            id: "blogs-group",
            label: "Blogs group",
            routerLink: ["extensions", "blogs-group"],
            icon: "user",
          },
        ],
      },
      "settings"
    ),
  ],
  exports: [],
})
export class BlogsGroupUiExtensionModule {}
