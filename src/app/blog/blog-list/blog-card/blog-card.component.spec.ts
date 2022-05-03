import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogTagsComponent } from '../../blog-categories/blog-tags.component';

import { BlogCardComponent } from './blog-card.component';

describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;
  let blogCardDe: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BlogCardComponent, BlogTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    blogCardDe = fixture.debugElement;
  });

  it('should have a blog card', () => {
    const blogItemDe: DebugElement = blogCardDe.query(
      By.css('article.blog__item')
    );
    const blogItemEl: HTMLElement = blogItemDe.nativeElement;
    expect(blogItemEl).toBeDefined();
  });

  it('should have an image element with alt attribute', () => {
    const blogImageDe: DebugElement = blogCardDe.query(
      By.css('.blog__image[alt]')
    );
    const blogImageEl: HTMLElement = blogImageDe.nativeElement;
    expect(blogImageEl).toBeDefined();
  });

  it('should show a blog title element on the blog card', () => {
    const blogLinkDe: DebugElement = blogCardDe.query(By.css('.blog__link'));
    const blogLinkEl: HTMLElement = blogLinkDe.nativeElement;
    expect(blogLinkEl).toBeDefined();
  });

  it('should show a date element on the blog card', () => {
    const blogDateDe: DebugElement = blogCardDe.query(By.css('.blog__date'));
    const blogDateEl: HTMLElement = blogDateDe.nativeElement;
    expect(blogDateEl).toBeDefined();
  });

  it('should show a read time on the blog card', () => {
    const blogReadTimeDe: DebugElement = blogCardDe.query(
      By.css('.blog__read-time')
    );
    const blogReadTimeEl: HTMLElement = blogReadTimeDe.nativeElement;
    expect(blogReadTimeEl).toBeDefined();
  });

  it('should have a category list element on the blog card', () => {
    const blogTagsDe: DebugElement = blogCardDe.query(By.css('blog-tags'));
    const blogTagsEl: HTMLElement = blogTagsDe.nativeElement;
    expect(blogTagsEl).toBeDefined();
  });
});
