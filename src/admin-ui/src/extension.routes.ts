export const extensionRoutes = [  {
    path: 'extensions/blogs',
    loadChildren: () => import('./extensions/565083358c400c99f0efbeadb42b117c6acb2811720b412e7bdd0465a2f2930f/blogs-ui-lazy.module').then(m => m.BlogsUiLazyModule),
  },
  {
    path: 'extensions/blog-group',
    loadChildren: () => import('./extensions/565083358c400c99f0efbeadb42b117c6acb2811720b412e7bdd0465a2f2930f/group-ui-extension.module').then(m => m.BlogsGroupUiExtensionModule),
  }];
