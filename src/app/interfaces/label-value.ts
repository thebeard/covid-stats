import { KeyValue } from '@angular/common';

export interface LabelValue extends Omit<KeyValue<string, number | string>, 'key'> {
  label: string;
}
