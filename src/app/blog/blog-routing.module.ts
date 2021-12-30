import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: ':slug',
        component: BlogPostComponent,
      },
      {
        path: '**',
        component: BlogComponent, // show a blog post not found page
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
