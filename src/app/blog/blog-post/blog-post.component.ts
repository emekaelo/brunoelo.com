import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('commentContainer') commentContainer!: ElementRef<any>;
  currentRoute$: Observable<ScullyRoute> = this.scully.getCurrent();
  onDestroy$ = new Subject<any>();
  currentRoute: ScullyRoute = {} as ScullyRoute;
  readProgressWidthInPercent: number = 0;
  pageId: string = '';

  constructor(
    private scully: ScullyRoutesService,
    private seoService: SeoService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.currentRoute$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((routeData: ScullyRoute) => {
        this.currentRoute = routeData;
        this.pageId = this.currentRoute.route;
        this.handleMetaTags(this.currentRoute);
      });
    this.addScrollListener();
  }

  handleMetaTags(routeData: ScullyRoute) {
    this.seoService.updateTitle(routeData.title!);
    this.seoService.updateMetaTags(
      routeData.title!,
      routeData.description,
      routeData.image.source,
      routeData.seo.keywords,
      routeData,
      'article'
    );
    this.seoService.updateTwitterMeta(
      routeData.title!,
      routeData.description,
      routeData.image.source
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

  ngAfterViewInit(): void {
    this.createGiscusComments();
  }

  createGiscusComments() {
    const script: HTMLScriptElement = this.renderer.createElement('script');
    const giscusScriptProps = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'brunoelo/brunoelo.com-discussion',
      'data-repo-id': 'R_kgDOIty9ZQ',
      'data-category': 'Announcements',
      'data-category-id': 'DIC_kwDOIty9Zc4CTY0-',
      'data-mapping': 'title',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': 'preferred_color_scheme',
      'data-lang': 'en',
      'data-loading': 'lazy',
      crossorigin: 'anonymous',
      async: '',
    };
    Object.entries(giscusScriptProps).forEach(([attribute, value]) => {
      script.setAttribute(attribute, value);
    });
    this.renderer.appendChild(this.commentContainer.nativeElement, script);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
