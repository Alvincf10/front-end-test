import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.guard';
import { environment } from '../../environment/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient,
  ) { }

    ParamGet = (object: any) => {
      let param = '';
      let i = 0;
      for (const val in object){
          if (i === 0){
              param += `?${val}=${object[val]}`;
          }else{
              param += `&${val}=${object[val]}`;
          }
          i++;
      }
      return param;
  }

    Get = (path: any, params: any = '') => {
        if (typeof params === 'object' && params !== null){
            params = this.ParamGet(params);
        }
        const url = environment.APIURL + path + params;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(url, {headers})
        .pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
          return throwError(() => error);
      })
        );
    }

    Post = (path: any, body: any) => {
      const url = environment.APIURL + path;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.post(url, body, {headers})
      .pipe(
          map((response: any) => {
              return response;
          }),
          catchError((error: any) => {
          return throwError(() => error);
      })
      );
  }

    Put = (path: any, body: any) => {
      const url = environment.APIURL + path;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.put(url, body, {headers})
      .pipe(
          map((response: any) => {
              return response;
          }),
          catchError((error: any) => {
          return throwError(() => error);
      })
      );
  }
    Delete = (path: any, id: any) => {
      const url = environment.APIURL + path + '/' + id;
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
      return this.http.delete(url, {headers})
      .pipe(
          map((response: any) => {
              return response;
          }),
          catchError((error: any) => {
          return throwError(() => error);
      })
      );
    }
}
