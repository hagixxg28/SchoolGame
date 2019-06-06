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
    ["Bully", new Character("Bront", "Local Bully", "rgba(57, 204, 204,0.65)", "../assets/images/characters/Bully.jpeg")],
    ["Nerd", new Character("Miles", "Local Nerd", "rgba(177, 13, 201,0.65)", "../assets/images/characters/GeekPic.PNG")],
    ["PopGirl", new Character("Stacy", "Popular", "rgba(255, 220, 0,0.65)", "../assets/images/characters/PopularGirl.png")],
    ["Freak", new Character("Jason", "Freak", "rgba(54, 163, 127, 0.65)", "../assets/images/characters/FreakBoy.png")],
    ["Counselor", new Character("Henry", "Counselor", "rgba(255, 220, 0, 0.65)", "../assets/images/characters/Counceller.jpg")],
    ["Stoner", new Character("Frank", "Stoner", "rgb(49, 145, 92)", "../assets/images/characters/StonerBoy.png")],
    ["Mom", new Character("Mom", "Parent", "rgba(240, 18, 190,0.65)", "../assets/images/characters/Mother.png")],
    ["Dad", new Character("Dad", "Parent", "rgba(165, 42, 42,0.65)", "../assets/images/characters/Father.png")],
    ["Coach", new Character("David", "Coach", "rgba(99, 22, 200, 0.65)", "../assets/images/characters/gymTeacher.png")],
    ["Teacher", new Character("Teacher", "Teacher", "#001f3f", "../assets/images/characters/Giovanna.png")],
    ["Principal", new Character("Sebastian", "Principal", "#AAAAAA", "../assets/images/characters/principal2.png")],
    ["Lela", new Character("Ms.Lela", "Teacher", "#3D9970", "../assets/images/characters/teacher.png")],
    ["ShyGirl", new Character("Jessy", "Overachiever", "rgba(149,151,197,0.65)", "../assets/images/characters/shyGirl2.png")],

    //End Game characters
    ["StressFull", new Character("", "", "red", "../assets/images/LoseImages/StressFullLose.jpg")],
    ["StressLess", new Character("", "", "lightblue", "../assets/images/LoseImages/StressLessLose.jpg")],
    ["SocialFull", new Character("", "", "darkorchid", "../assets/images/LoseImages/SocialFullLose.jpg")],
    ["SocialLess", new Character("", "", "darkslategray", "../assets/images/LoseImages/SocialEmptyLose.jpg")],
    ["ParentFull", new Character("", "", "deepskyblue", "../assets/images/LoseImages/ParentFullLose.jpg")],
    ["ParentLess", new Character("", "", "midnightblue", "../assets/images/LoseImages/ParentsEmptyLose.jpg")],
    ["GradeFull", new Character("", "", "slategrey", "../assets/images/LoseImages/GradesFullLose.jpg")],
    ["GradeEmpty", new Character("", "", "slategrey", "../assets/images/LoseImages/GradesEmptyLose.jpg")],

    //Void Character
    ["VoidBoi", new Character("", "", "", "")],

    //Enviorment Characters
    ["MorningView", new Character("", "", "#FFDC00", "../assets/images/characters/MorningView.png")],
    ["MorningView2", new Character("", "", "#FFDC00", "../assets/images/characters/MorningView2.png")],
    ["AfternoonView", new Character("", "", "#85144b", "../assets/images/characters/AfternoonView.png")],
    ["AfternoonView2", new Character("", "", "#85144b", "../assets/images/characters/AfternoonView2.png")],
    ["AfternoonView2", new Character("", "", "#85144b", "../assets/images/characters/AfternoonView3.png")],
    ["EveningView", new Character("", "", "#022d58", "../assets/images/characters/EveningView.png")],
    ["EveningView2", new Character("", "", "#022d58", "../assets/images/characters/EveningView2.png")],
    ["EveningView3", new Character("", "", "#022d58", "../assets/images/characters/EveningView3.png")],

    //Objects and Animals
    ["Owl", new Character("", "", "#FFDC00", "../assets/images/characters/Owl.png")],
    ["Tv", new Character("Tv", "in room", "#AAAAAA", "../assets/images/characters/Tv.png")],
    ["Hall", new Character("??", "???", "#022d58", "../assets/images/characters/Hall.png")],

    //Dream Characters
    ["DreamBoi", new Character("????", "??", "#AAAAAA", "../assets/images/characters/dreamBoi.png")],
    ["Rich", new Character("Rich", "Wealthy", "#FF851B", "../assets/images/characters/Rich.png")],
    ["PinkOwl", new Character("???", "??", "#F012BE", "../assets/images/characters/PinkOwl.png")],
    ["DoorMan", new Character("DoorMan", "Guardian", "#FF851B", "../assets/images/characters/DoorMan.png")],
  ])


  getMap() {
    return this.CharactersMap;
  }

  getCharacter(character: Characters) {
    return this.CharactersMap.get(character.toString());
  }


}
