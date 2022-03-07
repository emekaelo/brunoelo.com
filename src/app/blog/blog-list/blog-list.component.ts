import { Component, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
      map((links) => links.filter((link) => link.route.length > 5)),
      tap((val) => console.log(val))
    );
    this.handleMetaTags();
  }

  handleMetaTags() {
    this.seoService.updateTitle('BrunoElo Blog');
    this.seoService.updateMetaTags(
      'BrunoElo Blog',
      '',
      '',
      'tech, software, development'
    );
    this.seoService.updateTwitterMeta('BrunoElo Blog', '', '');
  }
}
