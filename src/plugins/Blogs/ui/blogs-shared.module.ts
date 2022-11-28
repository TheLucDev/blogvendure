import { NgModule } from "@angular/core";
import { SharedModule } from "@vendure/admin-ui/core";
import { BlogsAssetsComponent } from "./components/blog-assets/blogs-assets.component";

@NgModule({
  imports: [SharedModule],
  exports: [SharedModule, BlogsAssetsComponent],
  declarations: [BlogsAssetsComponent],
})
export class BlogsSharedModule {}
