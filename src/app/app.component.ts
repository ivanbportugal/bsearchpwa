import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'bspwa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bible Search';
  searchText: string = "";
  searchTextControl = new FormControl();
  showIntro: boolean = true;

  ngOnInit() {
    this.searchTextControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => {
        console.log('Detected: ' + newValue);
        if (this.showIntro && newValue.length > 2) {
          this.showIntro = false;
        }
      })
  }
}
