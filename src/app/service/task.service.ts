import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private gService: GlobalService) { }

  getAll = (param: any) => {
    return this.gService.Get('task', param);
  }

  save = (item: any) => {
    return this.gService.Post('task', item);
  }

  Update = (item: any) => {
    return this.gService.Put(`task/${item.id}`, item);
  }

  Delete = (id: any) => {
    return this.gService.Delete(`task`, id);
  }
}
