import { Component, OnInit } from '@angular/core';
import { UmpireInfoModel } from '../models/umpire-info-model';

@Component({
  selector: 'app-umpire-info',
  templateUrl: './umpire-info.component.html',
  styleUrls: ['./umpire-info.component.scss']
})
export class UmpireInfoComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Contact'];
  umpiresInfo: UmpireInfoModel[] = [{ Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' },
  { Name: 'Test', Email: 'test@email.com', Contact: '00000000' }];
  constructor() { }

  ngOnInit() {
  }

}
