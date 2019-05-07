import { Injectable } from '@angular/core';
import { Bar } from '../models/bar';

@Injectable({
  providedIn: 'root'
})
export class BarService {

  constructor() { }


  //Bar URL images vars
  //----
  stressUrl = "./assets/images/barIcons/stress.png"
  socialUrl = "./assets/images/barIcons/social.png"
  gradesUrl = "./assets/images/barIcons/grades.png"
  parentsUrl = "./assets/images/barIcons/parents.png"



  //Bar Section-----

  Bars = [
    new Bar("STRESS",
      this.stressUrl, 30, "primary",
      "Dangit!", "Relaxing..")
    ,
    new Bar("SOCIAL",
      this.socialUrl, 40, "primary",
      "Smooth", "Weird")
    ,
    new Bar("GRADES",
      this.gradesUrl, 60, "primary",
      "Smart!", "Another F"),

    new Bar("PARENTS",
      this.parentsUrl, 50, "primary",
      "Proud", "Dissapointed"),


  ]


  getFirstBars() {
    return this.Bars;
  }
}
