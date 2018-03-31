import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { BibleService } from './bible.service';
import {Theorem} from '../../model/theorem';
import {ElementRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit, OnDestroy {

  pageSize = 10;
  private pageSizeSubscription;
  allTheorems: Theorem[];
  filtered: Theorem[];
  private thmSubscription;
  private thmFirstSubscription;
  private thmUpdateSubscription;
  @ViewChild('theoremList') elementView: ElementRef;

  constructor(private service: BibleService) {
    this.pageSizeSubscription = this.service.pageSize$.subscribe(num => {
      this.pageSize = num;
      this.thmUpdateSubscription = this.service.updateTheoremCount(num).subscribe(thm => {
        this.filtered = thm;
      });
      console.log('page size updated to: ' + num);
    });
  }

  ngOnInit() {
    this.thmSubscription = this.service.findAllTheorems()
      .subscribe(
        theorems => {
          this.allTheorems = theorems;
        }
      );
    this.thmFirstSubscription = this.service.fillFirstTheorems()
      .subscribe(
        theorems => {
          this.filtered = theorems;
        }
      );
  }

  ngOnDestroy() {
    this.thmSubscription.unsubscribe();
    this.pageSizeSubscription.unsubscribe();
    this.thmUpdateSubscription.unsubscribe();
    this.thmFirstSubscription.unsubscribe();
  }

  search(search: string) {
    this.filtered = this.allTheorems.filter(theorem =>
      theorem.rule.includes(search) ||
       (theorem.name && theorem.name.toLowerCase().includes(search.toLowerCase())
    ));
  }
}
