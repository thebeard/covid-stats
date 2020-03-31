import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoService } from './info.service';
import { InfoResolver } from './info.resolver';

@NgModule({
  imports: [CommonModule],
  providers: [InfoService, InfoResolver]
})
export class InfoDataModule {}
