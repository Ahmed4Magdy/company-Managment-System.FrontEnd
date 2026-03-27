// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, map } from 'rxjs';
// import { LoginRequest, LoginResponse } from '../models/employee.model';
// import { API_BASE } from './api.service';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   constructor(private http: HttpClient) {}

//   login(credentials: LoginRequest): Observable<LoginResponse> {
//     return this.http
//       .post<Record<string, unknown>>(`${API_BASE}/auth/employee/login`, credentials, { observe: 'response' })
//       .pipe(
//         map((res) => {
//           const body = res.body ?? {};
//           const data = body['data'] as Record<string, unknown> | undefined;
//           const tokenFromBody =
//             (body['token'] as string) ??
//             (data?.['token'] as string) ??
//             (body['accessToken'] as string) ??
//             (body['access_token'] as string);
//           const tokenFromHeader =
//             res.headers.get('authorization')?.replace(/^Bearer\s+/i, '')?.trim() ??
//             res.headers.get('x-auth-token') ??
//             res.headers.get('X-Access-Token');
//           const token = tokenFromBody ?? tokenFromHeader ?? null;
//           if (token) {
//             localStorage.setItem('token', token);
//           }
//           return { token: token ?? '', message: (body['message'] as string) ?? 'OK' };
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/employee.model';
import { API_BASE } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_BASE}/auth/employee/login`, request) //url,post,body,loginresponse
      .pipe( //use for process response before returning it
        tap((res) => { // run when resposne comes from backend 
          localStorage.setItem('token', res.token); //Save token in browser storage
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');  // delete token when user is loggedout
  }

  getToken(): string | null {
    return localStorage.getItem('token');  // will get token or return saved token or null is not found 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  //!! is true and it mean that if user have token will return true
  }
}