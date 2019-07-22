import { Component, Input, forwardRef, Output, EventEmitter, AfterContentChecked } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputFieldComponent implements ControlValueAccessor, AfterContentChecked {
  @Input() classeCss: string;
  @Input() id: String = '';
  @Input() label: string;
  @Input() placeholder: String = '';
  @Input() autocomplete: String = 'off';
  @Input() type: String = 'text';
  @Input() control: FormControl;
  @Input() isReadOnly: Boolean = false;
  @Input() mask: string;
  @Input() saveMasked: boolean;
  @Input() maxlength: number;
  @Input() restrictTo: string;
  @Input() required_signal?: boolean;
  @Output() changed = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();

  private innerValue: any;

  ngAfterContentChecked() {
    if ( this.control && this.control.validator ) {
      const validator = this.control.validator(this.control);
      this.required_signal = (validator && validator.required) ? true : false;
    }
  }

  get value() {
    return this.innerValue;
  }

  setFocus( e: any) {
    this.focus.emit( e );
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.changed.emit(v);
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  readOnly() {
    if ( this.isReadOnly ) {
      return 'readonly';
    }
    return null;
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

  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
