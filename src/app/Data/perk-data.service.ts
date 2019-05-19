import { Injectable } from '@angular/core';
import { PerkObject } from '../models/perkObject';
import { Perk } from '../enums/Perks';

@Injectable({
  providedIn: 'root'
})
export class PerkDataService {

  constructor() { }


  PerksMap = new Map<string, PerkObject>([
    [Perk.Smoker, new PerkObject(Perk.Smoker, 3)],
    [Perk.Depressed, new PerkObject(Perk.Depressed, 5)],
    [Perk.BadStudent, new PerkObject(Perk.BadStudent, 3)],
    [Perk.Strong, new PerkObject(Perk.Strong, 8)],
  ])

  PerkRecoverDayMap = new Map<Perk, number>([
    [Perk.Smoker, 3],
    [Perk.Depressed, 5],
    [Perk.BadStudent, 3],
    [Perk.Strong, 8],
  ])
}

