import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxSlideToggleComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox-slide-toggle',
  templateUrl: './checkbox-slide-toggle.component.html',
  styleUrls: ['./checkbox-slide-toggle.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class CheckboxSlideToggleComponent implements OnInit, ControlValueAccessor {

  @Input() disabled: boolean;
  @Input() label: string;
  @Input() labelPosition: 'After' | 'Before';
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  @Output() changed = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  @Output() clicked = new EventEmitter<any>();

  @ViewChild('handle', {static: true}) handle: ElementRef;
  @ViewChild('bar', {static: true}) bar: ElementRef;
  @ViewChild('input', {static: true}) input: ElementRef;
  @ViewChild('labelEl', {static: true}) labelEl: ElementRef;
  @ViewChild('slider', {static: true}) slider: ElementRef;

  private _handle: any;
  private _bar: any;
  private _label: any;
  private _value: any;


  constructor(
    private _render: Renderer2,
  ) { }

  ngOnInit() {
    this.disabled = false;
    setTimeout(() => {
      this._handle = this.handle.nativeElement.getBoundingClientRect();
      this._bar = this.bar.nativeElement.getBoundingClientRect();
      this._label = this.labelEl.nativeElement.getBoundingClientRect();

      this.checkBoxChange();
    }, 10);
  }

  checkBoxChange() {

    switch ( this.input.nativeElement.checked ) {
      case true:
        this._render.setStyle( this.handle.nativeElement, 'left', `${ ( this._bar.width + 1 ) - this._handle.width  }px`);
        this._render.removeClass( this.bar.nativeElement, 'inactive' );
        this._render.addClass( this.bar.nativeElement, 'active' );
      break;
      case false:
        this._render.setStyle( this.handle.nativeElement, 'left', '-1px');
        this._render.removeClass( this.bar.nativeElement, 'active');
        this._render.addClass( this.bar.nativeElement, 'inactive' );
      break;
    }
  }


  onClick( event ) {
    event.preventDefault();
    if ( !this.disabled ) {
      this.value = !this.value;
      this.input.nativeElement.checked = this.value;

      this.clicked.emit(this);

      setTimeout(() => {
        this.checkBoxChange();
      }, 10);
    }
  }

  get value() {
    return this._value;
  }

  set value(v: any) {
    if ( this.disabled ) {
      return;
    }

    if (v !== this._value) {
      this.changed.emit(v);
      this._value = v;
      this.onChangeCb(v);

      setTimeout(() => {
        this.checkBoxChange();
      }, 10);
    }
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


}
