import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { SeoService } from './seo.service';
import { expect } from '@jest/globals';

describe('SeoService', () => {
  let service: SeoService;
  let titleServiceSpy: { setTitle: jest.Mock };
  let metaServiceSpy: { updateTag: jest.Mock };
  const stubTitle: string = 'stub title';

  beforeEach(() => {
    titleServiceSpy = { setTitle: jest.fn() };
    metaServiceSpy = { updateTag: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Title, useValue: titleServiceSpy },
        { provide: Meta, useValue: metaServiceSpy },
      ],
    });
    service = TestBed.inject(SeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setTitle once with a string as new title', () => {
    service.updateTitle(stubTitle);
    expect(titleServiceSpy.setTitle).toHaveBeenNthCalledWith(1, stubTitle);
  });

  it('should call updateTag with tags', () => {
    service.updateMetaTags(stubTitle, 'desc', 'imgUrl', 'key', '/canonicalUrl');
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(1, {
      name: 'description',
      content: 'desc',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(2, {
      name: 'keywords',
      content: 'key',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(3, {
      property: 'og:title',
      content: stubTitle,
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(4, {
      property: 'og:type',
      content: 'website',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(5, {
      property: 'og:image',
      content: 'imgUrl',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(6, {
      property: 'og:url',
      content: 'https://brunoelo.com/canonicalUrl',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(7, {
      property: 'og:description',
      content: 'desc',
    });
  });

  it('should call updateTag with twitter tags', () => {
    service.updateTwitterMeta(stubTitle, 'desc', 'imgUrl');
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(1, {
      property: 'twitter:title',
      content: stubTitle,
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(2, {
      property: 'twitter:card',
      content: 'summary_large_image',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(3, {
      property: 'twitter:image',
      content: 'imgUrl',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(4, {
      property: 'twitter:url',
      content: 'https://www.brunoelo.com',
    });
    expect(metaServiceSpy.updateTag).toHaveBeenNthCalledWith(5, {
      property: 'twitter:description',
      content: 'desc',
    });
  });
});
