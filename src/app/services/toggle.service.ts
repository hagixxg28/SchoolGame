import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  constructor() { }

  public toggleObservable = new Subject<any>();

  toggleButtons() {
    this.toggleObservable.next();
  }

}
