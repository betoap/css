import {
  Component,
  Output,
  EventEmitter,
  Input,
  forwardRef,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from '@angular/forms';

export interface CheckboxOutputModel {
  id: string;
  value: boolean;
}

const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => CheckboxComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('checkbox', {static: true}) checkbox: ElementRef;
  @Output() outputResult = new EventEmitter<CheckboxOutputModel>();

  @Input() id: string;
  @Input() name: string;
  @Input() label: string;
  @Input() value: string;
  @Input() formControlName: string;
  @Input() isChecked: boolean;
  @Input() isDisabled: boolean;
  @Input() formGroup: FormGroup;

  public isActive: boolean;

  ngAfterViewInit(): void {
    this.isActive = this.checkbox.nativeElement.checked;
  }

  public onClick(event: MouseEvent): void {
    event.preventDefault();

    this.isActive = !this.isActive;

    this.writeValue(this.isActive);
    this.onChangeCb(this.isActive);
    this.onTouchedCb(this.isActive);

    this.outputResult.emit( {id: this.id, value: this.isActive } );
  }

  private onChangeCb: (_: any) => void = () => {};
  private onTouchedCb: (_: any) => void = () => {};

  public writeValue(v: any): void {
    this.value = v;
  }

  public registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
}
