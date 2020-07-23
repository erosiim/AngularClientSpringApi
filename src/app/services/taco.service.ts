import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './global';
import { Taco } from '../models/Taco';

@Injectable({
  providedIn: 'root'
})
export class TacoService {

  private url: string;

  constructor(private _tacoService: HttpClient) {
    this.url = Global.url;
  }

  getTacos() {
    return this._tacoService.get<Taco[]>(this.url + 'tacos')
  }

  insertTaco(taco: Taco) {
    return this._tacoService.post<Taco>(this.url + 'tacos', taco);
  }

  updateTaco(taco: Taco){
    return this._tacoService.put(this.url + 'tacos', taco);
  }

  deleteTaco(id: number){
    const url = this.url + 'tacos/' + id;
    return this._tacoService.delete(url);
  }

  getOneTaco(id: number){
    const url = this.url + 'tacos/' + id;
    return this._tacoService.get(url)
  }
}
