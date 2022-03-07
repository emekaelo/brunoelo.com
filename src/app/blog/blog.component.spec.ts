import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogListComponent } from './blog-list/blog-list.component';
import { routes } from './blog-routing.module';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(routes)],
        declarations: [BlogComponent, BlogListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show BrunoElo in header', () => {
    const blogDe: DebugElement = fixture.debugElement;
    const headerLinkDe: DebugElement = blogDe.query(By.css('.blog__header a'));
    const headerLink: HTMLElement = headerLinkDe.nativeElement;
    expect(headerLink.textContent).toBe('BrunoElo');
  });

  it('should show copyright with current year', () => {
    const blogDe: DebugElement = fixture.debugElement;
    const footerDe: DebugElement = blogDe.query(By.css('.blog__footer'));
    const footer: HTMLElement = footerDe.nativeElement;
    expect(footer.textContent).toBe(
      `© BrunoElo ${component.currentYear}. All rights reserved`
    );
  });
});
