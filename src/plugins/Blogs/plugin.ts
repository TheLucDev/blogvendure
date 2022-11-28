import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { adminApiExtensions, shopApiExtensions } from "./api/schema-extensions";
import path from "path";

import { Blog } from "./entities/blog.entity";

import { AddBlogResolver } from "./api/add-blog.resolver";
import { ListBlogResolver } from "./api/list-blog.resolver";
import { PluginInitOptions } from "./types";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import { PLUGIN_INIT_OPTIONS } from "./constants";
import { DeleteBlogResolver, UpdateBlogResolver } from "./api";
import { DetailBlogResolver } from "./api/detail-blog.resolver";

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Blog],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [
      AddBlogResolver,
      UpdateBlogResolver,
      DeleteBlogResolver,
      DetailBlogResolver,
      ListBlogResolver,
    ],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [DetailBlogResolver, ListBlogResolver],
  },
  providers: [
    // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
    // user-defined options into other classes, such as the {@link ExampleService}.
    { provide: PLUGIN_INIT_OPTIONS, useFactory: () => BlogsPlugin.options },
  ],
  //   configuration: (config) => {
  //     return config;
  //   },
})
export class BlogsPlugin {
  static options: PluginInitOptions = {};

  /**
   * The static `init()` method is a convention used by Vendure plugins which allows options
   * to be configured by the user.
   */
  static init(options: PluginInitOptions) {
    this.options = options;
    return BlogsPlugin;
  }

  static uiExtensions: AdminUiExtension = {
    translations: {
      en: path.join(__dirname, "ui/translations/en.json"),
      vi: path.join(__dirname, "ui/translations/vi.json"),
    },
    extensionPath: path.join(__dirname, "ui"),
    ngModules: [
      {
        type: "shared" as const,
        ngModuleFileName: "blogs-ui-extension.module.ts",
        ngModuleName: "BlogsUiExtensionModule",
      },
      {
        type: "lazy" as const,
        route: "blogs",
        ngModuleFileName: "blogs-ui-lazy.module.ts",
        ngModuleName: "BlogsUiLazyModule",
      },
      // {
      //   type: "lazy" as const,
      //   route: "blog-group",
      //   ngModuleFileName: "group-ui-extension.module.ts",
      //   ngModuleName: "BlogsGroupUiExtensionModule",
      // },
      // {
      //   type: "lazy" as const,
      //   route: "blogs-group",
      //   ngModuleFileName: "blogs-ui-lazy.module.ts",
      //   ngModuleName: "BlogsUiLazyModule",
      // },
    ],
  };
}
