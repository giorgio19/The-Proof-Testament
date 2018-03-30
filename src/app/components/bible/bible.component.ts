import { Component, OnInit, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { BibleService } from './bible.service';
import {Theorem} from '../../model/theorem';
import {ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {

  allTheorems: Theorem[];
  filtered: Theorem[];
  @ViewChild('theoremList') elementView: ElementRef;
  @Output() secondClickEvent = new EventEmitter();

  constructor(private service: BibleService) {}

  ngOnInit() {
    this.service.findAllTheorems()
      .subscribe(
        theorems => this.allTheorems = this.filtered = theorems
      );
  }

  search(search: string) {
    this.filtered = this.allTheorems.filter(theorem =>
      theorem.rule.includes(search) ||
       (theorem.name && theorem.name.toLowerCase().includes(search.toLowerCase())
    ));
  }

  insertIntoEditorComp(name) {
    this.secondClickEvent.emit(name);
  }

}
