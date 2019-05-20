import { Injectable } from '@angular/core';
import { Bar } from '../models/bar';

const stressUrl = "./assets/images/barIcons/stress.png"
const socialUrl = "./assets/images/barIcons/social.png"
const gradesUrl = "./assets/images/barIcons/grades.png"
const parentsUrl = "./assets/images/barIcons/parents.png"


@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor() { }




  //Bar Section-----

  Bars = [
    new Bar("STRESS",
      stressUrl, 30, "primary",
      "Dangit!", "Relaxing..")
    ,
    new Bar("SOCIAL",
      socialUrl, 40, "primary",
      "Smooth", "Weird")
    ,
    new Bar("GRADES",
      gradesUrl, 50, "primary",
      "Smart!", "Another F"),

    new Bar("PARENTS",
      parentsUrl, 40, "primary",
      "Proud", "Dissapointed"),


  ]


  getFirstBars() {
    return this.Bars;
  }
}
