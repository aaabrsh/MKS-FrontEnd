import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { AppCommonModule } from '../app.common.module';
import { TreeListComponent } from './components/tree-list/tree-list.component';

@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TimeAgoPipe,
    ShortDatePipe,
    TreeListComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule
  ],
  exports: [
    ListComponent,
    ToolbarComponent,
    TimeAgoPipe,
    TreeListComponent
  ]
})
export class SharedModule { }
