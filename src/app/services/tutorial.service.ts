import { Injectable } from '@angular/core';
import { Day } from '../models/day';
import { GameEvent } from '../models/gameEvent';
import { CharacterDataService } from '../Data/character-data.service';
import { Characters } from '../enums/Characters';
import { dayTimes } from '../enums/dayTimes';
import { Choice } from '../models/choice';
import { Perk } from '../enums/Perks';
import { choiceWithText } from '../models/choiceWithText';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private charData: CharacterDataService) { }


  tutorialReactionMap = new Map<String, GameEvent>([
    ['cantHear', new GameEvent(this.charData.getCharacter(Characters.PopGirl), dayTimes.morning, "I said- you swiped right didn’t you?",
      "Maybe",
      "No, I swiped left",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('canHear')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('lying')))],
    ['computerControls', new GameEvent(this.charData.getCharacter(Characters.PopGirl), dayTimes.morning, "Hmm.. It says you’re playing this from your computer so… I think you can make choices with the buttons on the card, and with the A and D keys, give it a try!",
      "I get it",
      "I’ll pass",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0))],

    ['lying', new GameEvent(this.charData.getCharacter(Characters.PopGirl), dayTimes.morning,
      "Stop lying! You swiped right I can see it! Whatever, that means you know how to swipe!",
      "What now",
      "Yeah",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0))],
    ['canHear', new GameEvent(this.charData.getCharacter(Characters.PopGirl), dayTimes.morning,
      "Good! that means you know how to make a choice in this game! Which makes me very happy!",
      "What now",
      "Good?",
      new Choice(0, 0, 0, 0, () => {
        if (window.innerWidth > 800) {
          return this.tutorialReactionMap.get('computerControls')
        }
        return this.tutorialPhone[1]
      }),
      new Choice(0, 0, 0, 0, () => {
        if (window.innerWidth > 800) {
          return this.tutorialReactionMap.get('computerControls')
        }
        return this.tutorialPhone[1]
      }))],
    ['okay', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.evening,
      "How do you do that you ask? I’m glad you asked! With your choices! They make a difference!",
      "Raise Stress and Social",
      "Lower School and Parents",
      new Choice(10, 10, 0, 0),
      new Choice(0, 0, -10, -10))],
    ['how', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.evening,
      "I’m glad you asked! With your choices! They make a difference!",
      "Raise Stress and Social",
      "Lower School and Parents",
      new Choice(10, 10, 0, 0),
      new Choice(0, 0, -10, -10))],
    ['know', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "Oh yeah! Some choices will give you a perk, a perk will affect your choices you can make and the things that happen to you!",
      "Gain a perk",
      "I don’t want a perk",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('gainPerk'), undefined, Perk.Smart),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('noPerk'), undefined, Perk.Smart))],

    ['gainPerk', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "I made you smart! Can you feel it? You can see it at the bottom left at the Perks section.",
      "",
      "I can’t see it!",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('canSee'),
        new Map<Perk, choiceWithText>([
          [Perk.Smart, new choiceWithText("I can see it! I am smart!", new Choice())]
        ])),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('cantSee')))],
    ['noPerk', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "Too bad! You get a perk! I made you smart! Can you feel it? You can see it at the bottom left at the Perks section.",
      "",
      "I can’t see it!",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('canSee'),
        new Map<Perk, choiceWithText>([
          [Perk.Smart, new choiceWithText("I can see it! I am smart!", new Choice())]
        ])),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('cantSee')))],

    ['canSee', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "Good! you see it! One last thing, we got music! You can enable it at the bottom left corner, it’s a cute button",
      "I'm ready to play",
      "Wait! I don't get it!",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('dontGet')))],
    ['cantSee', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "Maybe the smart perk didn’t work on you… We got music if you like music, you can enable it at the bottom left corner..",
      "I'm ready to play",
      "Wait! I don't get it!",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('dontGet')))],

    ['dontGet', new GameEvent(this.charData.getCharacter(Characters.Nerd), dayTimes.night,
      "Eh… I’ll just send you back in time then!",
      "What?",
      "No no! I get it now!",
      new Choice(0, 0, 0, 0, () => this.getTutorialFirstEvent()),
      new Choice(0, 0, 0, 0))],
  ])

  tutorialPhone = new Day(
    new GameEvent(
      this.charData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "Hi there! Swipe the card left if you can hear me!",
      "I can hear you",
      "What did you say?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('canHear')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('cantHear'),
      )
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.PopGirl),
      dayTimes.noon,
      "Well, I don’t have any spare time to explain you how this game works, so I’ll call Larry for you. Larry! Get over here!",
      "Who?",
      "Okay",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "Damit Stacy! We said it’s your turn to explain how this game works! Oh, hey there!",
      "Hey…",
      "Not again…",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.evening,
      "Don’t worry I’ll make this quick! You see those bars above me? Your job is to make sure none of them reach 100 or 0. If they will, you’ll lose!",
      "Okay.",
      "How do I do that?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('okay')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('how')),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.night,
      "See? You made them move! Just stay focused and you’ll manage to survive!",
      "Okay thanks.",
      "Anything else I should know?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('know')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('know')),
    ),
  )

  tutorialComp = new Day(
    new GameEvent(
      this.charData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "Hi there! Swipe the card left if you can hear me!",
      "I can hear you",
      "What did you say?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('canHear')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('cantHear'),
      )
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.PopGirl),
      dayTimes.noon,
      "Well, I don’t have any spare time to explain you how this game works, so I’ll call Larry for you. Larry! Get over here!",
      "Who?",
      "Okay",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "Damit Stacy! We said it’s your turn to explain how this game works! Oh, hey there!",
      "Hey…",
      "Not again…",
      new Choice(0, 0, 0, 0),
      new Choice(0, 0, 0, 0),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.evening,
      "Don’t worry I’ll make this quick! You see those bars above me? Your job is to make sure none of them reach 100 or 0. If they will, you’ll lose!",
      "Okay.",
      "How do I do that?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('okay')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('how')),
    ),
    new GameEvent(
      this.charData.getCharacter(Characters.Nerd),
      dayTimes.night,
      "See? You made them move! Just stay focused and you’ll manage to survive!",
      "Okay thanks.",
      "Anything else I should know?",
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('know')),
      new Choice(0, 0, 0, 0, () => this.tutorialReactionMap.get('know')),
    ),
  )

  checkIfTutorial(): boolean {
    let bool = localStorage.getItem('tutorial');
    if (!bool) {
      return true;
    }
    return false;
  }

  getTutorial(): Day {
    if (window.innerWidth > 800) {
      // IS computer 
      console.log(this.tutorialComp)
      return this.tutorialComp;
    } else {
      console.log(this.tutorialPhone)
      return this.tutorialPhone;
    }
  }

  getTutorialFirstEvent(): GameEvent {
    if (window.innerWidth > 800) {
      // IS computer 
      return this.tutorialComp[0];
    } else {
      return this.tutorialPhone[0];
    }
  }

  finishTutorial() {
    localStorage.setItem('tutorial', JSON.stringify(true))
  }

}
