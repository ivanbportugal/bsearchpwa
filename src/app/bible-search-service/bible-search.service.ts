import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BibleSearchService {

  private urlPrefix = '/search'

  constructor(
    public http: HttpClient
  ) { }

  search(query: string): Observable<RefVerse[]> {
    return this.http.post<RefVerse[]>(this.urlPrefix + '?query=' + query, {});
  }
}

export class RefVerse {
  book: string;
  reference: string;
  verse: string;
  verseSummary: string;
  expanded: boolean;
}

// {
//   "book": "Genesis",
//   "reference": "10:1",
//   "verse": "Now these are the generations of the sons of Noah, Shem, Ham, and Japheth: and unto them were sons born after the flood."
// },