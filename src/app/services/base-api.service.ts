import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  get<T>(url: string): Observable<T> {
    const customHeaders = new HttpHeaders();
    customHeaders.append('ContentType', 'application/json');
    return this.http.get<T>(`${this.baseUrl}` + url, { headers: customHeaders, observe: 'body', responseType: 'json' }).pipe(retry(1));
  }
  post<T>(url: string, body: {}): Observable<T> {
    const customHeaders = new HttpHeaders();
    customHeaders.append('ContentType', 'application/json');
    return this.http.post<T>(`${this.baseUrl}` + url, body,
      { headers: customHeaders, observe: 'body', responseType: 'json' }).pipe(retry(1));
  }
}
