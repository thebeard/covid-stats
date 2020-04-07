import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartsModule as NgChartsModule } from 'ng2-charts';

import { CardModule } from '../card';
import { DefaultLineChartOptionsProvider } from './line-chart/line-chart.model';
import { LineChartAdvancedComponent } from './line-chart-advanced/line-chart-advanced.component';
import { LineChartComponent } from './line-chart/line-chart.component';

const declarations = [LineChartComponent, LineChartAdvancedComponent];

@NgModule({
  declarations,
  imports: [CardModule, CommonModule, NgChartsModule, MatCardModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule],
  providers: [DefaultLineChartOptionsProvider],
  exports: declarations,
})
export class ChartsModule {}
