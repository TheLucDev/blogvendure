import { NgModule } from "@angular/core";
import { SharedModule, addNavMenuSection } from "@vendure/admin-ui/core";

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: "dashboard-nav",
        label: "My Blogs",
        items: [
          {
            id: "blogs",
            label: "Blogs",
            routerLink: ["/extensions/blogs"],
            icon: "world",
          },
        ],
      },
      // Add this section before the "settings" section
      "settings"
    ),
  ],
})
export class RealEstateSharedModule {}
