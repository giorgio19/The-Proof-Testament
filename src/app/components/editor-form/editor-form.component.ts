import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditorService} from '../editor/editor.service';

@Component({
  selector: 'app-editor-form',
  templateUrl: './editor-form.component.html',
  styleUrls: ['./editor-form.component.scss']
})
export class EditorFormComponent implements OnInit, OnDestroy {

  infoFilled: boolean;
  infoFilledSubscription;
  customProofSelected = false;

  constructor(private editorService: EditorService) {
    this.infoFilledSubscription = this.editorService.infoFilledChange.subscribe(infoFilled => {
      this.infoFilled = infoFilled;
    });
  }

  formSubmit() {
    this.editorService.toggleFormFilled();
  }

  onProofSelectionChanged(selection) {
    if (selection === 'custom') {
      this.customProofSelected = true;
    } else {
      this.customProofSelected = false;
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.infoFilledSubscription.unsubscribe();
  }
}
