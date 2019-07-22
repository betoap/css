import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ContainerComponent, ItemComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    ContainerComponent
  ]
})
export class ListModule { }
