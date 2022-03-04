import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By, Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ScullyRoute } from '@scullyio/ng-lib';
import { of } from 'rxjs';
import { BlogTagsComponent } from '../blog-categories/blog-tags.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { expect } from '@jest/globals';

import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let seoService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BlogListComponent, BlogCardComponent, BlogTagsComponent],
      providers: [Title],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have BrunoElo Blog in Title meta tag', () => {
    seoService = TestBed.inject(Title);
    expect(seoService.getTitle()).toBe('BrunoElo Blog');
  });

  it('should render correct number of blog posts', () => {
    const scullyRoutesMock: ScullyRoute[] = [
      {
        route: '/blog/latest-post',
        title: 'Jamstack SEO Guide: Content SEO',
        description: 'Sample blog description',
        image: '../../../../assets/compressed.jpg',
        meta: {
          title: 'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        },
        category: ['new'],
        published: true,
        sourceFile: 'latest-post.md',
      },
      {
        route: '/blog/latest-post',
        title: 'Jamstack SEO Guide: Content SEO',
        description: 'Sample blog description',
        image: '../../../../assets/compressed.jpg',
        meta: {
          title: 'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        },
        category: ['new'],
        published: true,
        sourceFile: 'latest-post.md',
      },
      {
        route: '/blog/latest-post',
        title: 'Jamstack SEO Guide: Content SEO',
        description: 'Sample blog description',
        image: '../../../../assets/compressed.jpg',
        meta: {
          title: 'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        },
        category: ['new'],
        published: true,
        sourceFile: 'latest-post.md',
      },
      {
        route: '/blog/latest-post',
        title: 'Jamstack SEO Guide: Content SEO',
        description: 'Sample blog description',
        image: '../../../../assets/compressed.jpg',
        meta: {
          title: 'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        },
        category: ['new'],
        published: true,
        sourceFile: 'latest-post.md',
      },
    ];
    component.links$ = of(scullyRoutesMock);
    fixture.detectChanges();
    const blogListDe = fixture.debugElement;
    const blogPostsDe = blogListDe.queryAll(By.css('app-blog-card'));
    const blogPostsEl = blogPostsDe.map(
      (blogPostDe) => blogPostDe.nativeElement
    );
    expect(blogPostsEl).toHaveLength(4);
  });
});
