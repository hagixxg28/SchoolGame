import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { Characters } from '../enums/Characters';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {
  constructor() { }

  CharactersMap = new Map([
    ["Hagi", new Character("Hagi", "Developer", "brown", "../assets/images/characters/Mischief.png")],
    ["Bobby", new Character("Bobby", "Yibby", "cyan", "../assets/images/characters/mock.jpg")],
    ["Elad", new Character("Elad", "Valad", "darkred", "../assets/images/characters/ELLAD.PNG")],
    ["Shlomi", new Character("Shlomi", "Mock", "green", "../assets/images/characters/shlomi.jpg")],
    ["Jojo", new Character("Jojo", "Punk", "purple", "../assets/images/characters/jojo.jpg")],
    ["McRide", new Character("McRide-Steffan", "Singer", "hotpink", "../assets/images/characters/McRide.jpg")],
    ["StressFull", new Character("", "", "red", "../assets/images/LoseImages/StressFullLose.jpg")],
    ["StressLess", new Character("", "", "lightblue", "../assets/images/LoseImages/StressLessLose.jpg")],
    ["SocialFull", new Character("", "", "darkorchid", "../assets/images/LoseImages/SocialFullLose.jpg")],
    ["SocialLess", new Character("", "", "darkslategray", "../assets/images/LoseImages/SocialEmptyLose.jpg")],
    ["ParentFull", new Character("", "", "deepskyblue", "../assets/images/LoseImages/ParentFullLose.jpg")],
    ["ParentLess", new Character("", "", "midnightblue", "../assets/images/LoseImages/ParentsEmptyLose.jpg")],
    ["GradeFull", new Character("", "", "slategrey", "../assets/images/LoseImages/GradesFullLose.jpg")],
    ["GradeEmpty", new Character("", "", "slategrey", "../assets/images/LoseImages/GradesEmptyLose.jpg")],
  ])


  getMap() {
    return this.CharactersMap;
  }

  getCharacter(character: Characters) {
    return this.CharactersMap.get(character.toString());
  }


}
