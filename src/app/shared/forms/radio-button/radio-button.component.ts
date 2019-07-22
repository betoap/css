import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IRadioButton } from './radio-button.model';

export interface IRadioButtonEmitter {
  value: string;
  id: number;
  selected: boolean;
}

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioButtonComponent,
      multi: true
    }
  ]

})
export class RadioButtonComponent implements OnInit {
  @Input()
  items: Array<IRadioButton>;

  @Input()
  id: string;

  @Input()
  class?: string;

  @Input()
  control?: FormControl;

  @Input()
  setCurrent: string;

  @Input()
  label?: string;

  @Output()
  result = new EventEmitter<IRadioButtonEmitter>();

  private value: any;


  constructor(){}

  ngOnInit() {
    this.class = (this.class) ? this.class : '';
  }

  /**
   * @param id este parâmetro já é passado dinamicamente.
   * @description
   * Define o valor do item selecionado como ativo e aplica a classe de item selecionado.
   */
  setAsChecked(id) {
    const container = Array.from(document.querySelectorAll(`#${ this.id } .label-container`));

    document.getElementById(`${ this.id }_${ id }`)['checked'] = true;

    container.forEach( (div, index) => {
      const radioButton: HTMLInputElement = div.querySelector('input');

      if ( radioButton.checked ) {
        if ( id === index && div.classList.contains('active')) {
          div.classList.remove('active');
          this.result.emit( {value: '', id, selected: null} );
          this.setValues({value: '', id, selected: null});
          return;
        }

        div.classList.add('active');
        this.result.emit( {value: radioButton.value, id, selected: true} );
        this.setValues({value: radioButton.value, id, selected: true});

        return;
      }

      div.classList.remove('active');
    });

  }

  private setValues(value: any) {
    this.writeValue(value);
    this.onChangeCb(value);
    this.onTouchedCb(value);
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
