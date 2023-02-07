import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { Book, MaxAndMin, SettingsForSort } from '../../interfaces';
import { createNode } from '../utils/createNode';
import { ChangeHandler } from '../../interfaces';
import { SETTINGS_FOR_SORT } from '../constants/constants';

export class Slider {
  max: MaxAndMin;
  min: MaxAndMin;
  products: Book[];
  step: number;
  key1: keyof Pick<SettingsForSort, 'priceMin' | 'countMin'>;
  key2: keyof Pick<SettingsForSort, 'priceMax' | 'countMax'>;
  changeHandler: ChangeHandler;
  name: string;

  constructor(
    min: MaxAndMin,
    max: MaxAndMin,
    products: Book[],
    step: number,
    key1: keyof Pick<SettingsForSort, 'priceMin' | 'countMin'>,
    key2: keyof Pick<SettingsForSort, 'priceMax' | 'countMax'>,
    changeHandler: ChangeHandler,
    name: string
  ) {
    this.max = max;
    this.min = min;
    this.products = products;
    this.step = step;
    this.key1 = key1;
    this.key2 = key2;
    this.changeHandler = changeHandler;
    this.name = name;
  }
  drawSlider(n: number) {
    const slider = createNode({ tag: 'div', classes: ['slider-container'] });

    noUiSlider.create(slider, {
      start: [SETTINGS_FOR_SORT[this.key1], SETTINGS_FOR_SORT[this.key2]],
      step: this.step,
      connect: true,
      range: {
        min: [this.min(this.products)],
        max: [this.max(this.products)],
      },

      tooltips: {
        to: function (numericValue: number): string {
          return numericValue.toFixed(n);
        },
      },
    });
    (slider as noUiSlider.target).noUiSlider?.on('change', (values: (string | number)[], handle: number) => {
      const valuesToString = values.join(';');
      if (!handle) {
        this.changeHandler(`addMin${this.name}`, valuesToString);
      } else {
        this.changeHandler(`addMax${this.name}`, valuesToString);
      }
    });

    return slider;
  }
}
