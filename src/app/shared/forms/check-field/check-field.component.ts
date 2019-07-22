import { Component, OnInit, Input, ViewChild, ElementRef, DoCheck, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-field',
  templateUrl: './check-field.component.html',
  styleUrls: ['./check-field.component.scss']
})
export class CheckFieldComponent implements OnInit, DoCheck {

  @ViewChild('radio', {static: true})
  radio: ElementRef<HTMLInputElement>;

  @Input()
  name: string;

  @Input()
  id: string;

  @Input()
  isChecked: any = '';

  @Output()
  selectCheck = new EventEmitter<any>();


  constructor() {}

  ngOnInit() {
    this.radio.nativeElement.checked = this.isChecked;
  }

  ngDoCheck() {
    this.isChecked = this.radio.nativeElement.checked;
  }

  public setRadio(): void {
    this.radio.nativeElement.checked = true;
    this.selectCheck.emit(this.id);
  }

}
