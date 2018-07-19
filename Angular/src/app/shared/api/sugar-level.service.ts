import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import SugarLevel from '../model/SugarLevel';

@Injectable()
export default class SugarLevelService {
  public API = 'http://localhost:8080/api';
  public SUGARLEVELS_API = `${this.API}/sugarlevels`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<SugarLevel[]> {
    return this.http.get<SugarLevel[]>(`${this.SUGARLEVELS_API}`);
  }

  get(id: string) {
    return this.http.get(`${this.SUGARLEVELS_API}/${id}`);
  }

  save(sugarLevel: SugarLevel): Observable<any> {
    let result: Observable<Object>;
    if (sugarLevel.id) {
      result = this.http.put(`${this.SUGARLEVELS_API}/${sugarLevel.id}`, sugarLevel);
    } else {
      result = this.http.post(this.SUGARLEVELS_API, sugarLevel);
    }
    return result;
  }

  remove(id: number) {
    return this.http.delete(`${this.SUGARLEVELS_API}/${id.toString()}`);
  }
}
