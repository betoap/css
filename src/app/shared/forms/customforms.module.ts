import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaskDirective } from './../../directives/mask.directive';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { TextareaFieldComponent } from './textarea-field/textarea-field.component';
import { StandardSelectboxComponent } from './standard-selectbox/standard-selectbox.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectSearchComponent } from './select-search/select-search.component';
import { CheckboxSlideToggleComponent } from './checkbox-slide-toggle/checkbox-slide-toggle.component';
import { CheckFieldComponent } from './check-field/check-field.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TesteComponent } from './teste/teste.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularSvgIconModule,
    ReactiveFormsModule
  ],
  declarations: [
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent,
    MaskDirective,
    SelectSearchComponent,
    CheckboxSlideToggleComponent,
    CheckFieldComponent,
    TesteComponent
  ],
  exports: [
    CheckboxComponent,
    ErrorMsgComponent,
    FormDebugComponent,
    InputFieldComponent,
    RadioButtonComponent,
    StandardSelectboxComponent,
    TextareaFieldComponent,
    MaskDirective,
    SelectSearchComponent,
    CheckboxSlideToggleComponent,
    CheckFieldComponent,
    AngularSvgIconModule
  ]
})
export class CustomFormsModule { }
