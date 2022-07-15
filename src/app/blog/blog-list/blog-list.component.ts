import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SeoService } from 'src/app/core/services/seo.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  links$: Observable<ScullyRoute[]> = this.scully.available$;
  constructor(
    private scully: ScullyRoutesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    // debug current pages
    this.links$ = this.links$.pipe(
      map((links) =>
        links
          .filter((link) => link.route.length > 5)
          .sort(
            (a, b) =>
              new Date(b.publishedDate).getTime() -
              new Date(a.publishedDate).getTime()
          )
      )
    );
    this.handleMetaTags();
  }

  handleMetaTags() {
    this.seoService.updateTitle('BrunoElo Blog');
    this.seoService.updateMetaTags(
      'BrunoElo Blog',
      'Blog for tech content and articles relating to software development, learning progress, career journey, quick guides, tutorials and more',
      '/assets/images/ppb.jpg',
      'tech, software, developer, frontend,frontend developer, frontend engineer, software developer, Emeka Elo-Chukwuma'
    );
    this.seoService.updateTwitterMeta(
      'BrunoElo Blog',
      'Blog for tech content and articles relating to software development, learning progress, career journey, quick guides, tutorials and more',
      '/assets/images/ppb.jpg'
    );
  }
}
