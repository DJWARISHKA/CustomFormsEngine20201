import {
  Component,
  Input,
  Output,
  EventEmitter,
  Type,
  Directive,
  OnInit,
} from '@angular/core';
import { DynamicData } from 'src/app/formeditor/dynamicData';


export function shuffle(array) {
  //Fisher–Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
/**
 * A base class that contains all Input's and Output's.
 */
@Directive({})
abstract class ComponentBase {
  @Input() index: number;
  @Input() data: DynamicData;
  @Output() change = new EventEmitter<any>();
}

/**
 * The implementation of all dynamic components below.
 */
@Component({
  selector: 'textd',
  templateUrl: './textDynamic.html',
})
export class TextDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Текст';
    this.data.el_type = 'text';
  }
  onChange() {
    if (this.data.minmax) {
      if (this.data.answer.length > this.data.max)
        this.data.answer = this.data.answer.padEnd(this.data.max);
    }
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'longTextd',
  templateUrl: './textDynamic.html',
})
export class LongTextDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Длинный текст';
    this.data.el_type = 'longtext';
  }
  onChange() {
    if (this.data.minmax) {
      if (this.data.answer.length > this.data.max)
        this.data.answer = this.data.answer.padEnd(this.data.max);
    }
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'numberd',
  templateUrl: './numberDynamic.html',
})
export class NumberDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Число';
    this.data.el_type = 'number';
  }
  onChange() {
    if (this.data.minmax) {
      if (this.data.answer < this.data.min) this.data.answer = this.data.min;
      if (this.data.answer > this.data.max) this.data.answer = this.data.max;
    }
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'checkboxd',
  templateUrl: './boxDynamic.html',
})
export class CheckBDynamic extends ComponentBase implements OnInit {
  values: string[];
  ngOnInit(): void {
    this.data.el_name = 'Несколько из списка';
    this.data.el_type = 'checkbox';
    this.values = this.data.answers.split('\n');
    if (this.data.random) shuffle(this.values); //Shaffle answers
    this.data.answer = new Array<boolean>(this.values.length);
  }
  onChange(i: number) {
    if (this.data.random) {
      let origin = this.data.answers.split('\n').indexOf(this.values[i]);
      this.data.answer[origin] != this.data.answer[origin]; //Change value at the original position
    } else this.data.answer[i] != this.data.answer[i];
    this.change.emit(this.data);
  }

}

@Component({
  selector: 'radioboxd',
  templateUrl: './boxDynamic.html',
})
export class RadioBDynamic extends ComponentBase implements OnInit {
  selected: number;
  values: string[];
  ngOnInit(): void {
    this.data.el_name = 'Один из списка';
    this.data.el_type = 'radiobox';
    this.values = this.data.answers.split('\n');
    if (this.data.random) shuffle(this.values); //Shaffle answers
  }
  onChange() {
    if (this.data.random) {
      this.data.answer = this.data.answers
        .split('\n')
        .indexOf(this.values[this.selected]); //Take value at the original position
    } else this.data.answer = this.selected;
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'comboboxd',
  templateUrl: './boxDynamic.html',
})
export class ComboBDynamic extends ComponentBase implements OnInit {
  selected: number;
  values: string[];
  ngOnInit(): void {
    this.data.el_name = 'Раскрывающийся список';
    this.data.el_type = 'combobox';
    this.values = this.data.answers.split('\n');
    if (this.data.random) shuffle(this.values); //Shaffle answers
  }
  onChange() {
    if (this.data.random) {
      this.data.answer = this.data.answers
        .split('\n')
        .indexOf(this.values[this.selected]); //Take value at the original position
    } else this.data.answer = this.selected;
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'dated',
  templateUrl: './dateDynamic.html',
})
export class DateDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Дата';
    this.data.el_type = 'date';
  }
  onChange() {
    if (this.data.minmax) {
      if (this.data.answer < this.data.min) this.data.answer = this.data.min;
      if (this.data.answer > this.data.max) this.data.answer = this.data.max;
    }
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'timed',
  templateUrl: './timeDynamic.html',
})
export class TimeDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Время';
    this.data.el_type = 'time';
  }
  onChange() {
    this.change.emit(this.data);
  }
}

@Component({
  selector: 'endpaged',
  templateUrl: './endpageDynamic.html',
})
export class EndPageDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.el_name = 'Конец страницы';
    this.data.el_type = 'endpage';
  }
  onChange() {
    this.change.emit(this.data);
  }
}
/**
 * The implementation of the main component below.
 */
@Component({
  selector: 'answer',
  template: `
    <ng-container *ngxComponentOutlet="$any(this) | resolve: element">
    </ng-container>
  `,
})
export class DynamicComponent extends ComponentBase {
  @Input() element: DynamicData;
  @Input() index: number;
  @Input() data: DynamicData;
  resolve(type: DynamicData): Type<ComponentBase> {
    switch (type.el_type) {
      case "text":
        return TextDynamic;
      case "longtext":
        return LongTextDynamic;
      case "number":
        return NumberDynamic;
      case "checkbox":
        return CheckBDynamic;
      case "radiobox":
        return RadioBDynamic;
      case "combobox":
        return ComboBDynamic;
      case "date":
        return DateDynamic;
      case "time":
        return TimeDynamic;
      case "endpage":
        return EndPageDynamic;
      default:
        console.warn(`Unknown of type ${type}`);
    }
  }
}

export const DynamicElements = [
  DynamicComponent,
  TextDynamic,
  LongTextDynamic,
  NumberDynamic,
  CheckBDynamic,
  RadioBDynamic,
  ComboBDynamic,
  DateDynamic,
  TimeDynamic,
  EndPageDynamic,
];
