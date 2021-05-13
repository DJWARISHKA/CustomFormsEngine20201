import { Component, Input, Output, EventEmitter, Type, Directive, OnInit } from "@angular/core";
import { DynamicData } from "../dynamicData"



/**
 * A base class that contains all Input's and Output's.
 */
@Directive({})
abstract class ComponentBase {
  @Input() index: number;
  @Input() data: DynamicData;
  @Output() change = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() copy = new EventEmitter<any>();
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
    this.data.index = this.index;
    this.data.el_name = 'Текст';
    this.data.el_type = 'text';
    this.data.minmax = true;
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'longTextd',
  templateUrl: './textDynamic.html',
})
export class LongTextDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Длинный текст';
    this.data.el_type = 'longtext';
    this.data.minmax = true;
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'numberd',
  templateUrl: './numberDynamic.html',
})
export class NumberDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Число';
    this.data.el_type = 'number';
    this.data.minmax = true;
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'checkboxd',
  templateUrl: './boxDynamic.html',
})
export class CheckBDynamic extends ComponentBase implements OnInit {
  values: string[];
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Несколько из списка';
    this.data.el_type = 'checkbox';
    this.data.minmax = true;
  }
  onChange(i: number) {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
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
    this.data.index = this.index;
    this.data.el_name = 'Один из списка';
    this.data.el_type = 'radiobox';
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
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
    this.data.index = this.index;
    this.data.el_name = 'Раскрывающийся список';
    this.data.el_type = 'combobox';
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'dated',
  templateUrl: './dateDynamic.html',
})
export class DateDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Дата';
    this.data.el_type = 'date';
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'timed',
  templateUrl: './timeDynamic.html',
})
export class TimeDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Время';
    this.data.el_type = 'time';
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}

@Component({
  selector: 'endpaged',
  templateUrl: './endpageDynamic.html',
})
export class EndPageDynamic extends ComponentBase implements OnInit {
  ngOnInit(): void {
    this.data.index = this.index;
    this.data.el_name = 'Конец страницы';
    this.data.el_type = 'endpage';
  }
  onClick() {
    this.data.answer = true;
    this.onChange();
  }
  onChange() {
    this.change.emit(this.data);
  }
  onCopy() {
    this.copy.emit(this.index);
  }
  onDelete() {
    this.delete.emit(this.index);
  }
}
/**
 * The implementation of the main component below.
 */
@Component({
  selector: "element",
  template: `
    <ng-container *ngxComponentOutlet="$any(this) | resolve: element">
    </ng-container>
  `
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
  EndPageDynamic
];
