import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { fromEvent, Observable, Subject } from 'rxjs';
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
  readProgressWidthInPercent: number = 0;

  constructor(
    private scully: ScullyRoutesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.currentRoute$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeData: ScullyRoute) => {
        this.currentRoute = routeData;
        this.handleMetaTags(this.currentRoute);
      });
    this.addScrollListener();
  }

  handleMetaTags(routeData: ScullyRoute) {
    this.seoService.updateTitle(routeData.meta.title);
    this.seoService.updateMetaTags(
      routeData.meta.title,
      routeData.description,
      routeData.image,
      routeData.category
    );
    this.seoService.updateTwitterMeta(
      routeData.meta.title,
      routeData.description,
      routeData.image
    );
  }

  addScrollListener() {
    const scrollSource: Observable<Event> = fromEvent(document, 'scroll');
    scrollSource.pipe(takeUntil(this.onDestroy$)).subscribe((event: Event) => {
      this.updateReadProgress(event);
    });
  }

  updateReadProgress(event: Event) {
    const docElement = (event.target as Document).documentElement;
    const docBody = (event.target as Document).body;
    const scrollHeight =
      (docElement.scrollHeight || docBody.scrollHeight) - window.innerHeight;
    const scrollTop = docElement.scrollTop || docBody.scrollTop;
    this.readProgressWidthInPercent = (scrollTop / scrollHeight) * 100;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
