import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, OnDestroy {
  currentRoute$: Observable<ScullyRoute> = this.scully
    .getCurrent()
    .pipe(tap((route) => console.log(route)));
  onDestroy$ = new Subject<any>();
  currentRoute: ScullyRoute = {} as ScullyRoute;

  constructor(
    private scully: ScullyRoutesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.currentRoute$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeData) => {
        this.currentRoute = routeData;
        this.handleMetaTags(this.currentRoute);
      });
  }

  handleMetaTags(routeData: ScullyRoute) {
    this.seoService.updateTitle(routeData.title!);
    this.seoService.updateMetaTags(
      routeData.title!,
      routeData.description,
      routeData.image,
      routeData.category
    );
    this.seoService.updateTwitterMeta(
      routeData.title!,
      routeData.description,
      routeData.image
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
