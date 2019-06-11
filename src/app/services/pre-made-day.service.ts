import { Injectable } from '@angular/core';
import { Day } from '../models/day';
import { GameEvent } from '../models/gameEvent';
import { CharacterDataService } from '../Data/character-data.service';
import { Characters } from '../enums/Characters';
import { dayTimes } from '../enums/dayTimes';
import { Choice } from '../models/choice';
import { choiceWithText } from '../models/choiceWithText';
import { Perk } from '../enums/Perks';
import { ChildrenOutletContexts } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PreMadeDayService {

  constructor(private charData: CharacterDataService) { }

  preTestDayReactionMap = new Map<String, GameEvent>([
    ['cheatSheet', new GameEvent(this.charData.getCharacter(Characters.Geek), dayTimes.noon, "What will I get out of it?",
      "I'll tell people how cool you are",
      "I thought we were friends",
      new Choice(0, -10, 0, 0, () => this.preTestDayReactionMap.get('deal')),
      new Choice(0, 0, 0, 0, () => this.preTestDayReactionMap.get('noDeal')))],

    ['deal', new GameEvent(this.charData.getCharacter(Characters.Geek), dayTimes.noon, "You got a deal!",
      "Good",
      "On a second thought, forget it",
      new Choice(-5, 0, 0, 0, undefined, undefined, Perk.Cheater),
      new Choice(0, -10))],
    ['noDeal', new GameEvent(this.charData.getCharacter(Characters.Geek), dayTimes.noon, "Friends? You never talk to me after school!",
      "What a dweeb",
      "Forget it",
      new Choice(0, 5, 0, 0), new Choice())],
    ['gotCheatSheet', new GameEvent(this.charData.getCharacter(Characters.Bully), dayTimes.afternoon, "Nice!! Now hand it over",
      "Fuck off!",
      "You can copy it if you want",
      new Choice(5, -5, 0, 0), new Choice(0, 10))],
    ['inRoom', new GameEvent(this.charData.getCharacter(Characters.EveningView), dayTimes.evening, "You're in your room, what are you going to do?",
      "Study for the test",
      "Just chill",
      new Choice(5, 0, 0, 0, () => this.preTestDayReactionMap.get('study1')), new Choice(-10, 0))],
    ['study1', new GameEvent(this.charData.getCharacter(Characters.EveningView), dayTimes.evening, "You're studying for the test, you're not having fun",
      "Keep studying",
      "Finish studying",
      new Choice(10, 0, 0, 0, () => this.preTestDayReactionMap.get('study2')), new Choice())],
    ['study2', new GameEvent(this.charData.getCharacter(Characters.EveningView), dayTimes.evening, "You're growing tired as you continue studying",
      "Keep studying",
      "Finish studying",
      new Choice(5, 0, 0, 0, () => this.preTestDayReactionMap.get('study3')), new Choice())],
    ['study3', new GameEvent(this.charData.getCharacter(Characters.EveningView), dayTimes.evening, "You feel like you covered the important subjects of the test",
      "That should be enough",
      "I need to study more",
      new Choice(-5, 0, 0, 0, undefined, undefined, Perk.Smart),
      new Choice(10, 0, 0, 0, undefined, undefined, Perk.Smart))],
    ['answerJessy', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "I'm not ready for the test! This isn't hapenning!",
      "Calm down!",
      "Why didn't you study more?",
      new Choice(0, 0, 0, 0, () => this.preTestDayReactionMap.get('calmDown')),
      new Choice(0, 0, 0, 0, () => this.preTestDayReactionMap.get('studyMore')))],
    ['calmDown', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "I can't calm down! I can't get a bad grade on this test!",
      "It's alright, I'll help you tomorrow.",
      "It's just a test",
      new Choice(0, 10, 0, 0, () => this.preTestDayReactionMap.get('help')),
      new Choice(0, -5, 0, 0, () => this.preTestDayReactionMap.get('justTest')))],
    ['studyMore', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "I needed to study more! I didn't have time, so many tests..",
      "It's alright, I'll help you tomorrow.",
      "It's just a test",
      new Choice(0, 10, 0, 0, () => this.preTestDayReactionMap.get('help')),
      new Choice(0, -10, 0, 0, () => this.preTestDayReactionMap.get('justTest')))],
    ['help', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "You will? Oh thank you! Thank you!",
      "No problem, just sit next to me tomorrow",
      "On a second thought, I can't risk getting caught",
      new Choice(0, 10, 0, 0),
      new Choice(0, -15, 0, 0))],
    ['justTest', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "It's not just a test! *hangs up*",
      "",
      "",
      new Choice(0),
      new Choice(0))],
    ['notReady', new GameEvent(this.charData.getCharacter(Characters.DreamBoi), dayTimes.dream, "You... Y̶̤̎̓ő̴̠͚̭u̵̼͖͊ are not P̶̲̤͇̉R̶̨̥̓̎Ę̴̳͝P̴̫͛̾A̵̦̗͐R̸̛̠̃E̸̛̱̾D̴͈̈́͊̑",
      "What are you saying?",
      "I'm not!",
      new Choice(5),
      new Choice(10))],

    ['studied', new GameEvent(this.charData.getCharacter(Characters.DreamBoi), dayTimes.dream, "So you did.. farewell then, good L̶U̸C̷K̵",
      "Thanks!",
      "You're weird",
      new Choice(-10),
      new Choice(-5))],

  ])
  testDayReactionMap = new Map<String, GameEvent>([
    ['question2', new GameEvent(this.charData.getCharacter(Characters.AfternoonView), dayTimes.noon, "The second question seems to be harder than the last one", "Try to guess an asnwer", "Try to copy off someone else",
      new Choice(5, 0, -5, 0, () => this.testDayReactionMap.get('question3'),
        new Map<Perk, choiceWithText>([
          [Perk.Cheater, new choiceWithText("Use cheat sheet", new Choice(5, 0, 0, 0, () => this.testDayReactionMap.get('question3')))],
          [Perk.Smart, new choiceWithText("Answer it easily", new Choice(-5, 0, 5, 0, () => this.testDayReactionMap.get('question3')))],
        ])),
      new Choice(10, 0, -5, 0, () => this.testDayReactionMap.get('question3'))
    )],
    ['question3', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.noon, "What's the answer for that question?", "Tell her you don't know", "Ignore her",
      new Choice(5, 0, -5, 0, () => this.testDayReactionMap.get('lelaCatches'),
        new Map<Perk, choiceWithText>([
          [Perk.Cheater, new choiceWithText("Show her from the cheat sheet", new Choice(5, 10, 0, 0, () => this.testDayReactionMap.get('lelaCatches')))],
          [Perk.Smart, new choiceWithText("Give her the answer", new Choice(5, 10, 0, 0, () => this.testDayReactionMap.get('lelaCatches')))],
        ])),
      new Choice(5, -10, -5, 0, () => this.testDayReactionMap.get('question4'))
    )],
    ['question4', new GameEvent(this.charData.getCharacter(Characters.AfternoonView), dayTimes.noon, "The test has proven to be rather short but still difficult", "Hand the test before everybody else", "Wait until somebody else hands over his test",
      new Choice(5, 0, 0, 0),
      new Choice(0, 0, 0, 0, () => this.testDayReactionMap.get('question5'))
    )],
    ['question5', new GameEvent(this.charData.getCharacter(Characters.AfternoonView), dayTimes.noon, "You see the nerd handing his test over", "Hand yours as well", "Check the test again for errors",
      new Choice(0, 0, 0, 0),
      new Choice(10, 0, 0, 0, () => this.testDayReactionMap.get('question6'))
    )],
    ['question6', new GameEvent(this.charData.getCharacter(Characters.AfternoonView), dayTimes.noon, "You couldn't find anything to fix", "Hand over the test", "Check again",
      new Choice(0, 0, 0, 0),
      new Choice(5, 0, 0, 0, () => this.testDayReactionMap.get('question6'))
    )],
    ['lelaCatches', new GameEvent(this.charData.getCharacter(Characters.Lela), dayTimes.noon, "Did you just give her the answer?", "Try to cover it up", "Confess",
      new Choice(10, 0, -5, 0, () => this.testDayReactionMap.get('jessyAdmits')),
      new Choice(5, 0, -10, 0, () => this.testDayReactionMap.get('jessyAdmits'))
    )],
    ['jessyAdmits', new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.noon, "It's my fault Ms.Lela! I asked him for the answer", "Insist you are the one to blame", "Stay silent",
      new Choice(10, 15, -5, 0, () => this.testDayReactionMap.get('dualPunishment')),
      new Choice(5, -5, 0, 0, () => this.testDayReactionMap.get('jessyPunishment'))
    )],
    ['dualPunishment', new GameEvent(this.charData.getCharacter(Characters.Lela), dayTimes.noon, "I believe in forgivness, and since both of you confessed, I will look the other way", "Thank you!", "Stay silent",
      new Choice(-10, 0, 0, 0, () => this.testDayReactionMap.get('question4')),
      new Choice(-5, 0, 0, 0, () => this.testDayReactionMap.get('question4'))
    )],
    ['jessyPunishment', new GameEvent(this.charData.getCharacter(Characters.Lela), dayTimes.noon, "Come with me young lady, we're going to the principal!", "Give a sorry look to Jessy", "Stay silent",
      new Choice(10, 5, 0, 0, () => this.testDayReactionMap.get('question4')),
      new Choice(5, -10, 0, 0, () => this.testDayReactionMap.get('question4'))
    )],
  ])



  testDay = new Day(
    (new GameEvent(this.charData.getCharacter(Characters.Lela), dayTimes.morning, "I will be watching over you today at the test", "Now I know I have been blessed", "Okay",
      new Choice(0, -10, 5, 0),
      new Choice())),
    (new GameEvent(this.charData.getCharacter(Characters.AfternoonView), dayTimes.noon, "The first question of the test seems simple", "Answer it", "Try to copy off someone else", new Choice(0, 0, 5, 0, () => this.testDayReactionMap.get('question2')),
      new Choice(0, 0, 0, 0, () => this.testDayReactionMap.get('question2')))),
    undefined,
    (new GameEvent(this.charData.getCharacter(Characters.Geek), dayTimes.afternoon, "This test was so easy!", "Shut up loser", "Ignore him",
      new Choice(-5, 5, -5, 0, undefined,
        new Map<Perk, choiceWithText>([
          [Perk.Cheater, new choiceWithText("Thanks for the help man", new Choice(0, 5))]
        ])),
      new Choice())),
    (new GameEvent(this.charData.getCharacter(Characters.Dad), dayTimes.evening, "How was the test?", "Fine", "Hard",
      new Choice(0, 0, 5, 0, undefined,
        new Map<Perk, choiceWithText>([
          [Perk.Smart, new choiceWithText("Easy", new Choice(-5, 0, 0, 10))]
        ])),
      new Choice(10, 0, 0, -10))),
  )



  preTestDay = new Day(
    new GameEvent(this.charData.getCharacter(Characters.Principal), dayTimes.morning, "The big math test is tomorrow, and you all better get good grades!", "We're having a test tomorrow!?", "Okay..", new Choice(5), new Choice()),

    new GameEvent(this.charData.getCharacter(Characters.Geek), dayTimes.noon, "This test is going to be so easy!", "Stop showing off!", "Can you hook me up with a cheat sheet?", new Choice(-5, 5), new Choice(0, 0, 0, 0, () => this.preTestDayReactionMap.get('cheatSheet'))),
    undefined,

    new GameEvent(this.charData.getCharacter(Characters.Bully), dayTimes.afternoon, "Did you get a cheat sheet from him?", "Even if he gave me I wouldn't give it to you", "No",
      new Choice(-5, -5, 0, 0, undefined,
        new Map<Perk, choiceWithText>([
          [Perk.Cheater, new choiceWithText("Yeah I got it", new Choice(0, 10, 0, 0, () => this.preTestDayReactionMap.get('gotCheatSheet')))]
        ])),
      new Choice(0, -5)),

    new GameEvent(this.charData.getCharacter(Characters.Dad), dayTimes.evening,
      "Are you going to study for the test?", "Yeah", "Nope",
      new Choice(5, 0, 0, 10, () => this.preTestDayReactionMap.get('inRoom')),
      new Choice(-5, 0, 0, -10, () => this.preTestDayReactionMap.get('inRoom'))),

    new GameEvent(this.charData.getCharacter(Characters.ShyGirl), dayTimes.night, "Your phone is ringing, Jessy is calling you", "Answer", "Ignore",
      new Choice(0, 5, 0, 0, () => this.preTestDayReactionMap.get('answerJessy')),
      new Choice(0, -5)
    ),
    new GameEvent(this.charData.getCharacter(Characters.DreamBoi), dayTimes.dream, "Are you ready for the t̸e̵s̴t̴?", 'Yes', "Not really",
      new Choice(0, 0, 0, 0, () => this.preTestDayReactionMap.get("notReady"),
        new Map<Perk, choiceWithText>([
          [Perk.Smart, new choiceWithText("Yeah, I studied", new Choice(-10, 0, 0, 0, () => this.preTestDayReactionMap.get("studied")))]
        ])),
      new Choice(10, 0, 0, 0, () => this.preTestDayReactionMap.get('notReady'))),
    this.testDay
  )


  preMadeDays = new Map<number, Day>([
    [0, this.preTestDay]
  ])


  pullRandomDay(): Day {
    let day = this.preMadeDays.get(Math.floor(Math.random() * this.preMadeDays.size));
    if (day.wasPicked) {
      return null;
    }
    day.wasPicked = true;
    return day;
  }

}
