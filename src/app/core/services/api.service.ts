import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export const API_BASE = '';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(API_BASE + url);
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(API_BASE + url, body);
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(API_BASE + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(API_BASE + url);
  }
}
















// export const API_BASE = '';

// @Injectable({ providedIn: 'root' })
// export class ApiService {
  
//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     });
//   }

//   get<T>(url: string): Observable<T> {
//     return this.http.get<T>(`${API_BASE}${url}`, { headers: this.getHeaders() });
//   }

//   post<T>(url: string, body: unknown): Observable<T> {
//     return this.http.post<T>(`${API_BASE}${url}`, body, { headers: this.getHeaders() });
//   }

//   put<T>(url: string, body: unknown): Observable<T> {
//     return this.http.put<T>(`${API_BASE}${url}`, body, { headers: this.getHeaders() });
//   }

//   delete<T>(url: string): Observable<T> {
//     return this.http.delete<T>(`${API_BASE}${url}`, { headers: this.getHeaders() });
//   }
// }