import { Injectable } from '@angular/core';
import { GameEvent } from '../models/gameEvent';
import { Characters } from '../enums/Characters';
import { dayTimes } from '../enums/dayTimes';
import { Choice } from '../models/choice';
import { CharacterDataService } from '../Data/character-data.service';

@Injectable({
  providedIn: 'root'
})
export class EventReactionService {

  constructor(private charactersData: CharacterDataService) { }
  // PrincipalReactionMap = new Map<String, GameEvent>([
  //   ["confront", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "I did not say such things! You better watch your mouth!", "I’m sorry!", "Don’t try lying! I heard you!",
  //     new Choice(0, 0, -5),
  //     new Choice(0, 0, 0, -10, this.PrincipalReactionMap.get("confront2"))
  //   )],
  //   ["confront2", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "You’re just another petty student, you don’t know what you heard.", "Forget it…", "A petty student? You’re a perverted piece of shit!",
  //     new Choice(0),
  //     new Choice(0, 0, 0, -10, this.getPrincipalReactMap().get("confront3"))
  //   )],
  //   ["confront3", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "Watch it, or I’ll make your life within this school a living hell.", "Walk away", "People are going to hear about this.",
  //     new Choice(0),
  //     new Choice(5, 0, 0, -5, this.getPrincipalReactMap().get("confront4"))
  //   )],
  //   ["confront4", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "Oh! You’re threatening me? Even though none will believe you?", "Walk away", "I’m not going to go down alone.",
  //     new Choice(0),
  //     new Choice(0, 0, 0, -10, this.getPrincipalReactMap().get("confront5"))
  //   )],
  //   ["confront5", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "I’m giving you a last chance, walk away and I’ll forget about this.", "Walk away", "I recorded you with my phone (bluff)",
  //     new Choice(0),
  //     new Choice(10, 0, 0, -5, this.getPrincipalReactMap().get("confront6"))
  //   )],
  //   ["confront6", new GameEvent(
  //     this.charactersData.getCharacter(Characters.Principal),
  //     dayTimes.afternoon,
  //     "You’re right, I’m sorry, I shouldn’t talk like that", "Good boy..", "We’re not done, raise my grades, or else.",
  //     new Choice(0, 20),
  //     new Choice(0, 0, 0, 40)
  //   )],
  // ])
}
