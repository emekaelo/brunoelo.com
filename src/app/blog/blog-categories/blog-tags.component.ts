import { Component, Input } from '@angular/core';

@Component({
  selector: 'blog-tags',
  template: `<div class="blog-category__list">
    <span
      *ngFor="let category of categories; let i = index"
      class="blog-category__item"
      >{{ category
      }}<span
        class="blog-category__delimiter"
        *ngIf="i !== categories.length - 1"
      >
        |
      </span>
    </span>
  </div>`,
  styles: [
    `
      .blog-category__list {
        white-space: nowrap;
        overflow: auto;
        -ms-overflow-style: none; /* Internet Explorer 10+ */
        scrollbar-width: none; /* Firefox */
        &::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .blog-category__item {
          font-size: 14px;
          font-weight: 400;
          .blog-category__delimiter {
            font-weight: 100;
          }
        }
      }
    `,
  ],
})
export class BlogTagsComponent {
  @Input() categories: string[] = [];
}
