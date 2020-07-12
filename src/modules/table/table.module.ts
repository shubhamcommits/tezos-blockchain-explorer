import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';

import  {  ScrollingModule  }  from  '@angular/cdk/scrolling';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatTableModule,
    ScrollingModule
  ]
})
export class TableModule { }
