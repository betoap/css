import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  HostListener,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  forwardRef
} from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const SELECTBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StandardSelectboxComponent),
  multi: true
};

@Component({
  selector: 'app-standard-selectbox',
  templateUrl: './standard-selectbox.component.html',
  styleUrls: ['./standard-selectbox.component.scss'],
  providers: [SELECTBOX_VALUE_ACCESSOR]
})
export class StandardSelectboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() items: Array<any>;
  @Input() selectType: string;
  @Input() label?: string;
  @Input() classeCss?: string;
  @Input() setCurrent?: number;
  @Input() control?: FormControl;
  @Input() required_signal?: boolean;
  @Input() isReadOnly: Boolean = false;

  @Output() changeItem = new EventEmitter<string>();

  @ViewChild('dropDownList', {static: true}) dropDownList: ElementRef<HTMLElement>;

  public showDropDown: boolean;
  public toggleIcon: string;
  public innerWidth: any;
  public innerHeight: any;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    event.stopPropagation();

    if (!this.eRef.nativeElement.contains(event.target) && this.showDropDown ) {
      this.hide();
    }
  }

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _changeDetector: ChangeDetectorRef,
    private eRef: ElementRef
  ) {
    this.showDropDown = false;
  }

  ngOnInit() {
    this.innerWidth = document.getElementsByTagName('body')[0].clientWidth ||
                      document.documentElement.clientWidth ||
                      window.innerWidth;

    this.innerHeight =  document.getElementsByTagName('body')[0].clientHeight ||
                        document.documentElement.clientHeight ||
                        window.innerHeight;

  }

  /**
   * @description
   * Clique da div sobre o select para abrir ou fechar à lista customizada
   */
  onClick() {
    if ( this.isReadOnly ) {
      return;
    }

    if (this.showDropDown === false) {
      this.show();
    } else {
      this.hide();
    }

  }

  /**
   * @param data
   * @description
   * Recebe o valor de opção através do clique da lista customizada
   */
  onClickOption(itemValue, id) {
    this.value = itemValue;
    this.changeItem.emit(itemValue);
    this.setCurrent = id;
    this.hide();
  }

  /**
   * @description
   * Mostra opções customizadas
   */
  show() {
    this.showDropDown = true;

    this.toggleIcon = 'fields__arrowIcon-rotate';

    this._changeDetector.detectChanges();
    const domRect = this.dropDownList.nativeElement.getBoundingClientRect();

    if ( ( domRect.top + domRect.height + 20)  > this.innerHeight ) {
      this._renderer.setStyle( this.dropDownList.nativeElement, 'top', `-${ domRect.height }px` );
    }

  }

  /**
   * @description
   * Esconde opções customizadas
   */
  hide() {
    this.showDropDown = false;
    this.toggleIcon = '';
  }

  ngOnDestroy() {
  }

  get value() {
    return this.value;
  }

  set value(val) {
    this.onChangeCb(val);
    this.onTouchedCb(val);
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    if (!v) {
      this.setCurrent = 0;
    }

    if (v) {
      this.value = v;
    }
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
