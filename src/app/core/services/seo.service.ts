import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ScullyRoute } from '@scullyio/ng-lib';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private meta: Meta) {}

  /** 
  Set the title of the current HTML document.
  @param newTitle */
  updateTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  /** 
  Updates the meta tags for the current HTML document.
  @param title
  @param  description
  @param  imageUrl
  @param  keywords
  @param  type */
  updateMetaTags(
    title: string,
    description: string,
    imageUrl: string,
    keywords: string,
    routeData?: ScullyRoute,
    type: string = 'website'
  ) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({
      property: 'og:image',
      content: imageUrl.includes('https://')
        ? imageUrl
        : `https://www.brunoelo.com${imageUrl}`,
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://brunoelo.com${
        routeData?.route ? routeData?.route : ''
      }`,
    });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (type === 'article') {
      this.meta.updateTag({
        property: 'article:author',
        content: 'Emeka Elo-Chukwuma',
      });
      this.meta.updateTag({
        property: 'article:published_time',
        content: this.convertDateToUTC(routeData?.publishedDate),
      });
      this.meta.updateTag({
        property: 'article:modified_time',
        content: this.convertDateToUTC(routeData?.lastModifiedDate),
      });
    } else {
      this.meta.removeTag("property='article:author'");
      this.meta.removeTag("property='article:published_time'");
      this.meta.removeTag("property='article:modified_time'");
    }
  }

  /** 
  Updates the Twitter meta tags for the current HTML document.
  @param title
  @param  description
  @param  imageUrl */
  updateTwitterMeta(title: string, description: string, imageUrl: string) {
    this.meta.updateTag({ property: 'twitter:title', content: title });
    this.meta.updateTag({
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      property: 'twitter:image',
      content: `https://www.brunoelo.com${imageUrl}`,
    });
    this.meta.updateTag({
      property: 'twitter:url',
      content: 'https://www.brunoelo.com',
    });
    this.meta.updateTag({
      property: 'twitter:description',
      content: description,
    });
  }

  convertDateToUTC(date: string) {
    let timezoneOffset = new Date(date).getTimezoneOffset() * 60000; //offset in milliseconds
    let localISOTime = new Date(Date.now() - timezoneOffset).toISOString();
    return localISOTime;
  }
}
