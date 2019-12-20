import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  authorization = 'Authorization';
  contenttype = 'ContentType';
  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string, private authservice: AuthService) {

  }

  get<T>(url: string): Observable<T> {
    const token = localStorage.getItem('token');
    const customHeaders = new HttpHeaders({
      [this.authorization]: `Bearer ${token}`,
      [this.contenttype]: 'application/json'
    });
    return this.http.get<T>(`${this.baseUrl}` + url, { headers: customHeaders, observe: 'body', responseType: 'json' }).pipe(retry(1));
  }

  post<T>(url: string, body: {}): Observable<T> {
    debugger;
    const token = localStorage.getItem('token');
    const customHeaders = new HttpHeaders({
      [this.authorization]: `Bearer ${token}`,
      [this.contenttype]: 'application/json'
    });
    return this.http.post<T>(`${this.baseUrl}` + url, body,
      { headers: customHeaders, observe: 'body', responseType: 'json' }).pipe(retry(1));
  }
}
