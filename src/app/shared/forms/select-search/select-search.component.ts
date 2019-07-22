import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Input,
  forwardRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, FormControlName } from '@angular/forms';
import { getClosest } from './../../../utils/getClosest';


export interface ISearchMapper {
  options: string;
  value: string;
}


const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectSearchComponent),
  multi: true
};

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class SelectSearchComponent implements OnInit, OnDestroy {

  @Input( 'mapper' ) mapper: ISearchMapper;
  @Input( 'charactersMinimum' ) charactersMinimum: Number = 0;
  @Input() placeholder: String = '';
  @Input() label: string;
  @Input() control: FormControl;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;
  @Input() class: string;

  private element: Element;

  public collection: Array<any>;

  private _unsub$ = new Subject();

  @ViewChild('searchBar', {static: true, read: ViewContainerRef })
  searchBar: ViewContainerRef;

  ngOnInit() {
    if ( !this.class ) {
      this.class = 'input-search';
    }
      this.element = this.searchBar.element.nativeElement.querySelector('.fields__searchbar .animated');
  }

  _map( data: Array<any> ) {
    if ( this.element ) {
      this.element.classList.add('hidden');
    }
    const itens = [];
    data.forEach( ( item ) => {
      const obj = {
        value: item[this.mapper.value],
        options: item[this.mapper.options]
      };
      itens.push( obj );
    });
    this.collection = itens;
  }

  setValue( value: object ) {
    this.formGroup.controls[ this.controlName ].setValue( value['options'] );
   }

  getInputValue( event ) {
    if ( event && event.length <= this.charactersMinimum ) {
      return this.collection = [];
    }
  }

  onFocusMethod( event ) {
    const el = getClosest( event.target, 'section');
    const elemList = el.querySelector( '.select__list' );
    if ( elemList ) {
      elemList.classList.add('show');
      elemList.classList.remove('fadeInDown');
      elemList.classList.add('fadeOutUp');
    }
  }

  onBlurMethod( event ) {
    const el = getClosest( event.target, 'section');
    const elemList = el.querySelector( '.select__list' );
    if ( elemList ) {
      elemList.classList.remove('fadeOutUp');
      elemList.classList.add('fadeInDown');
    }
  }

  ngOnDestroy() {
    this._unsub$.next();
    this._unsub$.complete();
  }

  onChangeCb: (_: any) => void = () => {};
  onTouchedCb: (_: any) => void = () => {};

  writeValue(v: any): void {
    // this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
}
