import { Component, Input, forwardRef, OnInit, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const TEXTAREA_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaFieldComponent),
  multi: true
};

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss'],
  providers: [TEXTAREA_FIELD_VALUE_ACCESSOR]
})

export class TextareaFieldComponent implements ControlValueAccessor {
  @ViewChildren('txtArea') txt: ElementRef;

  @Input() classeCss;
  @Input() control: FormControl;
  @Input() icon: String;
  @Input() disabled: String;
  @Input() id: String;
  @Input() maxlength: String;
  @Input() name: String;
  @Input() placeholder: String;
  @Input() required: String;
  @Input() label: String;
  @Input() subTitle?: string;
  @Input() isReadOnly = false;

  public isPressing = false;

  constructor() {}

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: (_: any) => void = () => {
    // todo - VERIFICAR A IMPLEMENTAÇÃO DISSO.
  }
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

  setFocus() {
    this.isPressing = true;
  }

  unsetFocus() {
    this.isPressing = false;
  }
}
