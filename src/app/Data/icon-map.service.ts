import { Injectable } from '@angular/core';
import { Perk } from '../enums/Perks';
import { Status } from '../enums/Status';

@Injectable({
  providedIn: 'root'
})
export class IconMapService {

  constructor() { }

  iconMap = new Map<Perk | Status, string>([
    [Perk.Smoker, "../assets/images/icons/perkIcons/Smoker.png"],
    [Perk.Depressed, "../assets/images/icons/perkIcons/Depressed.png"],
    [Status.Chill, "../assets/images/icons/statusIcons/chill.png"],
    [Status.DumbDumb, "../assets/images/icons/statusIcons/dumbdumb.png"],
    [Status.LocalCeleb, "../assets/images/icons/statusIcons/localCeleb.png"],
    [Status.ManOfStress, "../assets/images/icons/statusIcons/manOfStress.png"],
    [Status.MommasBoy, "../assets/images/icons/statusIcons/momasBoy.png"],
    [Status.Normie, "../assets/images/icons/statusIcons/normie.png"],
    [Status.TeachersPet, "../assets/images/icons/statusIcons/teacherPet.png"],
    [Status.TheLoner, "../assets/images/icons/statusIcons/loner.png"],
    [Status.lilRebel, "../assets/images/icons/statusIcons/lilRebel.png"]
  ])



  getIconURL(name: Perk | Status): string {
    return this.iconMap.get(name);
  }
}
