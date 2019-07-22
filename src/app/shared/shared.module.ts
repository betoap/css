import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteComponent } from './forms/teste/teste.component';
import { InputFieldComponent } from './forms/input-field';



@NgModule({
  declarations: [
    TesteComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TesteComponent,
    InputFieldComponent
  ]
})
export class SharedModule { }
