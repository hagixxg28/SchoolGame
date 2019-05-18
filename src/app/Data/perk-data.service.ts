import { Injectable } from '@angular/core';
import { PerkObject } from '../models/perk';
import { Perk } from '../enums/Perks';

@Injectable({
  providedIn: 'root'
})
export class PerkDataService {

  constructor() { }


  PerksMap = new Map<string, PerkObject>([
    [Perk.Smoker, new PerkObject(Perk.Smoker, 12)],
    [Perk.Smoker, new PerkObject(Perk.Smoker, 12)],
    [Perk.Smoker, new PerkObject(Perk.Smoker, 12)],
    [Perk.Smoker, new PerkObject(Perk.Smoker, 12)],
  ])
}
