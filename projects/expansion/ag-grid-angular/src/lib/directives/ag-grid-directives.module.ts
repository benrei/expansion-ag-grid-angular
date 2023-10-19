import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRowDirective } from './create-row.directive';

@NgModule({
  declarations: [CreateRowDirective],
  exports: [CreateRowDirective],
  imports: [CommonModule],
})
export class AgGridDirectivesModule {}
