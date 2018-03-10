import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { BibleSearchService, RefVerse } from './bible-search-service/bible-search.service';

@Component({
  selector: 'bspwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bible Search';
  showIntro: boolean = true;

  lastSearch: string = '';

  // searchText: string = "";
  // searchTextControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(40)]);

  // Chips
  separatorKeysCodes = [ENTER, COMMA];
  searchChips = new Array<any>();

  // Results
  results: RefVerse[] = [];

  // resultsRaw: RefVerse[] = [];

  // maxRenderCount: number = 500;

  constructor(
    public searchService: BibleSearchService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  private search(text: string) {
    if (this.lastSearch == text || text.length < 3) {
      return;
    }
    console.log('Searching for: ' + text);
    this.lastSearch = text;
    if (this.showIntro) {
      this.showIntro = false;
    }
    this.searchService.search(text)
      .subscribe(data => {
        this.results = this.setReferenceSummary(data);
        this.highlightSearchTextInResults();
        this.snackBar.open(data.length + ' results', null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        });
      }, err => {
        this.snackBar.open(err.error, 'Search Error');
      });
  }

  private highlightSearchTextInResults() {
    this.results.forEach(result => {
      this.searchChips.forEach(chip => {
        result.verse = this.wrapWithStyle(result.verse, chip.name);
        result.verseSummary = this.wrapWithStyle(result.verseSummary, chip.name);
        result.book = this.wrapWithStyle(result.book, chip.name);
        result.reference = this.wrapWithStyle(result.reference, chip.name);
      });
    });
  }

  private wrapWithStyle(verse: string, searchText: string): string {
    return verse.replace(new RegExp(searchText, 'gi'), '<span class="highlight">' + searchText + '</span>');
  }

  private setReferenceSummary(refVerses: RefVerse[]): RefVerse[] {
    for (let i = 0; i < refVerses.length; i++) {
      let refVerse = refVerses[i];
      refVerse.verseSummary = refVerse.verse;
    }
    return refVerses;
  }

  // Chips
  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add 
    if ((value || '').trim()) {
      this.searchChips.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.searchWithChips(this.searchChips);
  }

  remove(fruit: any): void {
    let index = this.searchChips.indexOf(fruit);

    if (index >= 0) {
      this.searchChips.splice(index, 1);
    }

    if (this.searchChips.length > 0) {
      this.searchWithChips(this.searchChips);
    } else {
      this.results = [];
    }
  }

  clearChips() {
    this.searchChips = new Array<any>();
    this.results = [];
  }
  
  searchWithChips(chips: Array<Object>) {
    let textFromChips = '';
    chips.forEach(chip => {
      textFromChips += chip['name'] + ',';
    });
    textFromChips = textFromChips.substring(0, textFromChips.lastIndexOf(','));
    this.search(textFromChips);
  }

  // Toggle Slider
  toggleSlider(sliderState: MatSlideToggleChange) {
    if (sliderState.checked) {
      this.expandAll();
    } else {
      this.collapseAll();
    }
  }

  private expandAll() {
    this.results.forEach(result => result.expanded = true);
  }

  private collapseAll() {
    this.results.forEach(result => result.expanded = false);
  }
}
