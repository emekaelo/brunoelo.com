import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCardComponent } from './blog-list/blog-card/blog-card.component';
import { BlogTagsComponent } from './blog-categories/blog-tags.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogPostComponent,
    BlogListComponent,
    BlogCardComponent,
    BlogTagsComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule],
})
export class BlogModule {}
