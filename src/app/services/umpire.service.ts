import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { DropdownModel } from '../shared/models/dropdown-model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Umpire } from '../models/umpire';
import { Location } from '../models/location';
import { Users } from '../models/users';
import { AddSchedule } from '../models/schedule';


@Injectable({
  providedIn: 'root'
})
export class UmpireService {

  constructor(private baseService: BaseApiService) { }

  getUmpires(): Observable<Umpire[]> {
    return this.baseService.get('Umpire/GetAllUmpires').pipe(
      map((res: any) => res.data)
    );
  }
  getLocation(): Observable<Location[]> {
    return this.baseService.get('Location/GetAllLocations').pipe(
      map((res: any) => res.data)
    );
  }
  signUp(data: Users): Observable<Users[]> {
    return this.baseService.post('User/SignUp', data);
  }
  addSchedule(schedule: AddSchedule) {
    return this.baseService.post('Schedule/AddSchedule', schedule);
  }

}
