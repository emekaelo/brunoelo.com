import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit {
  currentRoute$: Observable<ScullyRoute> = this.scully
    .getCurrent()
    .pipe(tap((route) => console.log(route)));

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {}
}
