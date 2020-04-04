import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsResolver } from './records.resolver';
import { RecordsService } from './records.service';

@NgModule({
  imports: [CommonModule],
  providers: [RecordsResolver, RecordsService]
})
export class RecordsModule {}
