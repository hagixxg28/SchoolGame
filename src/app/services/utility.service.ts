import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }



  lerp(ValueA, ValueB, t) {
    let result = (ValueA + ValueB) * t;
    return result;
  }
}
