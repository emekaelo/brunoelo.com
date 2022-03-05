import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ScullyContentComponent,
  ScullyLibModule,
  ScullyRoute,
} from '@scullyio/ng-lib';
import { SeoService } from 'src/app/core/services/seo.service';
import { BlogTagsComponent } from '../blog-categories/blog-tags.component';

import { BlogPostComponent } from './blog-post.component';
import { expect } from '@jest/globals';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;
  let blogPostDe: DebugElement;
  let seoServiceSpy: {
    updateTitle: jest.Mock;
    updateMetaTags: jest.Mock;
    updateTwitterMeta: jest.Mock;
  };
  const stubRoute: ScullyRoute = {
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
  };

  beforeEach(async () => {
    seoServiceSpy = {
      updateTitle: jest.fn(),
      updateMetaTags: jest.fn(),
      updateTwitterMeta: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ScullyLibModule],
      declarations: [
        BlogPostComponent,
        BlogTagsComponent,
        ScullyContentComponent,
      ],
      providers: [{ provide: SeoService, useValue: seoServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogPostDe = fixture.debugElement;
  });

  it('should have read progress bar', () => {
    const readProgressBarDe = blogPostDe.query(By.css('.read-progress-bar'));
    const readProgressBarEl = readProgressBarDe.nativeElement;
    expect(readProgressBarEl).toBeDefined();
  });

  it('should have a category list element on the blog card', () => {
    const blogTagsDe: DebugElement = blogPostDe.query(By.css('blog-tags'));
    const blogTagsEl: HTMLElement = blogTagsDe.nativeElement;
    expect(blogTagsEl).toBeDefined();
  });

  it('should show blog post updated on date', () => {
    const articleDateDe = blogPostDe.query(By.css('.article__date'));
    const articleDateEl = articleDateDe.nativeElement;
    expect(articleDateEl.textContent).toBeDefined();
  });

  it('should show blog post title', () => {
    const articleTitleDe = blogPostDe.query(By.css('.article__title'));
    const articleTitleEl = articleTitleDe.nativeElement;
    expect(articleTitleEl.textContent).toBeDefined();
  });

  it('should show blog post subtitle', () => {
    const articleSubtitleDe = blogPostDe.query(By.css('.article__subtitle'));
    const articleSubtitleEl = articleSubtitleDe.nativeElement;
    expect(articleSubtitleEl.textContent).toBeDefined();
  });

  describe('meta tag handler', () => {
    beforeEach(() => {
      component.handleMetaTags(stubRoute);
    });

    it('should call updateTitle with meta.title as argument', () => {
      expect(seoServiceSpy.updateTitle).toHaveBeenNthCalledWith(
        1,
        'Jamstack SEO Guide: Content SEO | BrunoElo Blog'
      );
    });

    it('should call updateMetaTags with 4 argument', () => {
      expect(seoServiceSpy.updateMetaTags).toHaveBeenNthCalledWith(
        1,
        'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        'Sample blog description',
        '../../../../assets/compressed.jpg',
        ['new']
      );
    });

    it('should call updateTwitterMeta with 3 argument', () => {
      console.log(seoServiceSpy.updateTwitterMeta.mock.calls);
      expect(seoServiceSpy.updateTwitterMeta).toHaveBeenNthCalledWith(
        1,
        'Jamstack SEO Guide: Content SEO | BrunoElo Blog',
        'Sample blog description',
        '../../../../assets/compressed.jpg'
      );
    });
  });
});
