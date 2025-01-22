import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login = (username: string, password: string) => {
    const param = {
      username,
      password
    };
    const path = 'login';
    const url = environment.APIURL + path;
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(url, param, {headers})
    .pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  logOut = () => {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
