import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { DropdownModel } from '../../models/dropdown-model';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ump-dropdown',
  templateUrl: './ump-dropdown.component.html',
  styleUrls: ['./ump-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UmpDropdownComponent)
    }
  ]
})
export class UmpDropdownComponent implements OnInit, ControlValueAccessor {

  @Input() ddModel: Observable<DropdownModel[]>;
  @Input() selected: number;
  @Input() disable = false;
  @Input() isSat = 0;

  @Output() selectOption = new EventEmitter<DropdownModel>();
  private onChange;

  dropControl = new FormControl();

  value = 1;
  constructor() { }

  ngOnInit() {
    this.value = this.selected;
    if (this.disable) {
      this.dropControl.disable();
    } else {
      this.dropControl.enable();
    }

  }
  getSelected(value) {
    this.onChange(value.value);
    this.selectOption.emit(value);
  }

  writeValue(obj: any): void {
    this.dropControl.setValue(obj);
    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    // throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }
}
