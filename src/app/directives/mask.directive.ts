import {
  Directive,
  HostListener,
  Input,
  ElementRef
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';
import { aplicarMascara } from '../utils';



@Directive({
  selector: '[edpMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MaskDirective,
    multi: true
  }]
})
export class MaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input('edpMask') edpMask: string;
  @Input('saveMasked') saveMasked: string;

  constructor(private el: ElementRef) { }

  writeValue(value: any): void {
    if (value) {
      this.el.nativeElement.value = aplicarMascara(value, this.edpMask);
      this.onChange(aplicarMascara(value, this.edpMask));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    $event.target.value = aplicarMascara(valor, this.edpMask);

    if (valor.length <= this.edpMask.length) {
      if ( this.saveMasked && this.saveMasked === 'true' ) {
        this.onChange(aplicarMascara(valor, this.edpMask));
        return;
      }

      this.onChange(valor);
    }

  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.edpMask.length) {
      return;
    }
    // this.onChange('');
    // $event.target.value = '';
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  // aplicarMascara(valor: string): string {
  //   if ( ! valor || typeof valor !== 'string' ) { return valor; }
  //   valor = valor.replace(/\D/g, '');
  //   const pad = this.edpMask.replace(/\D/g, '').replace(/9/g, '_');
  //   const valorMask = valor + pad.substring(0, pad.length - valor.length);
  //   let valorMaskPos = 0;

  //   valor = '';
  //   for ( let i = 0; i < this.edpMask.length; i++) {
  //     if ( isNaN( parseInt( this.edpMask.charAt( i ), 10 ) ) ) {
  //       valor += this.edpMask.charAt(i);
  //     } else {
  //       valor += valorMask[valorMaskPos++];
  //     }
  //   }

  //   if (valor.indexOf('_') > -1) {
  //     valor = valor.substr(0, valor.indexOf('_'));
  //   }

  //   return valor;
  // }
}
