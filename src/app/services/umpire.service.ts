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
  addUmpire(umpire: Umpire) {
    return this.baseService.post('Umpire/AddUmpire', umpire);
  }

  getAllSchedule(): Observable<AddSchedule[]> {
    return this.baseService.get('Schedule/GetAllSchedules').pipe(
      map((res: any) => res.data)
    );
  }
  getAllScheduleByUser(emailParam: string): Observable<AddSchedule[]> {
    return this.baseService.post('Schedule/GetScheduleByEmailAddress?email=' + emailParam, { email: emailParam }).pipe(
      map((res: any) => res.data)
    );
  }

  getAllGroupedSchedule(): Observable<any[]> {
    return this.baseService.get('Schedule/GetGroupedSchedule').pipe(
      map((res: any) => res.data)
    );
  }

  getLocationById(locId) {
    return this.baseService.post('Location/GetMapLocationById?id=' + locId, { id: locId });
  }

  getColor() {
    return this.baseService.get('Home/GetColor');
  }
  setColor(col) {
    return this.baseService.post('Home/SetColor', { color: col });
  }
  getFiles() {
    return this.baseService.get('Home/ListFiles');
  }
  public getPosition(): Observable<Position> {
    return Observable.create(
      (observer) => {
        navigator.geolocation.watchPosition((pos: Position) => {
          observer.next(pos);
        });
      });
  }
  public deleteUmpire(id) {
    return this.baseService.post('Umpire/DeleteUmpire?umpireId=' + id, { umpireId: id });
  }

}
