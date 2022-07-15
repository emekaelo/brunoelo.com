import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./portfolio/portfolio.module').then((m) => m.PortfolioModule),
  },
  {
    path: '**',
    redirectTo: 'blog',
    pathMatch: 'full',
  }, // matches www.example.com/<any route> to redirect to blogs
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
