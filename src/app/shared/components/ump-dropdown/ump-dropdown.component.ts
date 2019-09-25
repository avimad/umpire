import { Component, OnInit, Input } from '@angular/core';
import { DropdownModel } from '../../models/dropdown-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ump-dropdown',
  templateUrl: './ump-dropdown.component.html',
  styleUrls: ['./ump-dropdown.component.scss']
})
export class UmpDropdownComponent implements OnInit {
  @Input() ddModel: Observable<DropdownModel[]>;
  @Input() selected: number;

  value = 1;
  constructor() { }

  ngOnInit() {
    this.value = this.selected;
  }

}
