import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
    canonicalUrl: string = '',
    type: string = 'website'
  ) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://brunoelo.com${canonicalUrl}`,
    });
    this.meta.updateTag({ property: 'og:description', content: description });
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
    this.meta.updateTag({ property: 'twitter:image', content: imageUrl });
    this.meta.updateTag({
      property: 'twitter:url',
      content: 'https://www.brunoelo.com',
    });
    this.meta.updateTag({
      property: 'twitter:description',
      content: description,
    });
  }
}
