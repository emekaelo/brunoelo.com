import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogTagsComponent } from '../blog-categories/blog-tags.component';

import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;
  let blogPostDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ScullyLibModule],
      declarations: [BlogPostComponent, BlogTagsComponent],
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
});
