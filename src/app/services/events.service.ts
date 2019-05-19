//#region Imports

import { Injectable, OnInit } from '@angular/core';
import { GameEvent } from '../models/gameEvent';
import { Characters } from '../enums/Characters';
import { Choice } from '../models/choice';
import { Addiction } from '../models/addiction';
import { CharacterDataService } from '../Data/character-data.service';
import { Bar } from '../models/bar';
import { dayTimes } from '../enums/dayTimes';
import { Perk } from '../enums/Perks';
import { choiceWithText } from '../models/choiceWithText';
import { GameState } from '../models/gameState';

@Injectable({
  providedIn: 'root'
})

//#endregion

export class EventsService {

  //#region Include Varriables
  constructor(private charactersData: CharacterDataService) { }

  //Event Booleans:
  includeBully = true;
  includeNerd = true;
  includePopGirl = true;
  includeOther = true;
  includeFreak = true;
  includeCounselor = true;
  includeParents = true;
  includeTeacher = true;

  includeSmoker = false;
  includeDepressed = false;

  loseType: string;

  //#endregion

  //#region Reaction Maps
  //Event Pool variables:
  secondLastEvent: GameEvent;
  //Setting it to a void event so my function will work ( I don't want to pull the same character event after event)
  lastEvent = new GameEvent(this.charactersData.getCharacter(Characters.Void), dayTimes.none, "", "", "");
  loseEvent: GameEvent;


  LastEventMap = new Map([])

  MomReactionEventMap = new Map<String, GameEvent>([
    ["girlfriend", new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.afternoon,
      "Is she your girlfriend?", "Maybe", "No",
      new Choice(-5, 0, 0, -5),
      new Choice(5, 0, 0, 0)
    )],
  ])

  BullyReactionEventMap = new Map<String, GameEvent>([
    ["pushBack", new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.reaction,
      "Where did you get the balls to push me?", "I'm only starting", "You can't push me for no reason!",
      new Choice(10, 15, 0, -5),
      new Choice(5, -5, 0, 10)
    )],
  ])

  //#endregion

  //#region Events

  TeacherEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Teacher),
      dayTimes.noon,
      "You are late to the class!", "This wont happen again...", "I missed the bus!... Twice!",
      new Choice(0, 0, -15, -10, undefined, new Map<Perk, choiceWithText>([
        [Perk.BadStudent, new choiceWithText("Whatever...(Slacker)", new Choice())]
      ])),
      new Choice(10)
    )
  ]

  BullyEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "Pushes you violently", "Push him back", "Ignore him",
      new Choice(15, 0, 0, 0, this.BullyReactionEventMap.get("pushBack"), new Map<Perk, choiceWithText>([
        [Perk.Smoker, new choiceWithText("Wanna smoke?(Smoker)", new Choice())],
        [Perk.Depressed, new choiceWithText("Just beat me up already", new Choice())],
        [Perk.Strong, new choiceWithText("Beat the shit out of him", new Choice())],
      ])),
      new Choice(5, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "What are you looking at?", "Why do you care?", "Nothing..",
      new Choice(10),
      new Choice(5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "Can I copy your homework?", "Why would I help you?", "Let him copy",
      new Choice(-10, -5),
      new Choice(0, 10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "You're such a looser I'm going to kick your ass after school!", "Throw a chair at him", "What did I do to you!?",
      new Choice(-20, 15, -10, -25, undefined, undefined, Perk.Depressed),
      new Choice(10, -15)
    ),


    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.afternoon,
      "You see the bully sitting by himself crying", "Try to cheer him up", "Let him cry by himself  ",
      new Choice(-5, 5),
      new Choice(-10)
    ),
  ]

  NerdEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.morning,
      "I just scored the top grade in the class", "You're still a loser", "Good for you.",
      new Choice(-5, 5, -5, 0, undefined, undefined, Perk.Smoker),
      new Choice(10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "Why can't I get a gamer girlfriend?", "Stop acting weird", "I believe in you!",
      new Choice(0, 5, 0, 0, undefined, undefined, Perk.Smoker),
      new Choice(0, -10, 0, 0)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.afternoon,
      "Do you want to hang out? I'll help you with your project", "Sure thing!", "I'm busy",
      new Choice(-5, -10, 0, +10, undefined, undefined, Perk.Smoker),
      new Choice()
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "I'm gonna tell the teacher you cheated on the test!", "Slap him", "But I didn't cheat!",
      new Choice(0, 10, 0, -10, undefined, undefined, Perk.Smoker),
      new Choice(0, 0, -10, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.morning,
      "You see Miles getting bullied", "Help him against the bully", "Let him handle it by himself",
      new Choice(10, -10),
      new Choice()
    ),
  ]

  PopGirlEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "You're cute!", "Flirt with her", "No thanks.",
      new Choice(-10, 15, 0, 0, undefined, undefined, Perk.Smoker),
      new Choice(0, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "You wear this to school?", "What's wrong with it?", "I'll do better",
      new Choice(5, -10, 0, 0, undefined, undefined, Perk.Smoker),
      new Choice(5, 5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.noon,
      "Courtney is such a slut", "I know right?", "She's alright",
      new Choice(-5, 10),
      new Choice(10, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.afternoon,
      "Can you like my latest post?", "Sure thing!", "No way.",
      new Choice(0, 10),
      new Choice(0, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "I got this new Gucci scarf", "It looks great!", "What a waste of money!",
      new Choice(0, 15, 0, 0, undefined, undefined, Perk.Smoker),
      new Choice(-5, -20)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.evening,
      "Let's throw a party at your house!", "Let's do it!", "My parents will be mad",
      new Choice(10, 30, 0, -20),
      new Choice(15, -20, 0, 10)
    ),

  ]

  FreakEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.noon,
      "I listen to real music!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.afternoon,
      "Let's get pierced!", "Alright", "No thanks.",
      new Choice(5, 10, 0, -10),
      new Choice(5, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.morning,
      "Let's ditch this class!", "I'm in", "I gotta study",
      new Choice(-10, 10, 0, -10),
      new Choice(10, -5, 10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.evening,
      "Can you hide my ciggaretes at your place?", "Yeah", "No way",
      new Choice(10, 5, 0, -10),
      new Choice(0, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.noon,
      "Throw a rock into the teacher's lounge!", "Throw a rock", "You do it",
      new Choice(20, 30, -10, -25),
      new Choice(5, -10)
    ),
  ]

  CounselorEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      dayTimes.morning,
      "Are you alright?", "Yeah", "I need to talk abit",
      new Choice(),
      new Choice(-5, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      dayTimes.afternoon,
      "You see the counselor's door is open and no one is around", "Get in", "Keep walking",
      new Choice(-10),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      dayTimes.noon,
      "Therapy is very important, do you get it?", "Stay Silent", "Therapy is for losers!",
      new Choice(),
      new Choice(10, 10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      dayTimes.noon,
      "Is there a bully in our school?", "Tell him", "Not that I know of",
      new Choice(5, -20, 0, 10),
      new Choice(10)
    ),
  ]

  ParentsEvents = [
    //#region Dad

    //Dad Events--
    new GameEvent(
      this.charactersData.getCharacter(Characters.Dad),
      dayTimes.evening,
      "You need to get better grades!", "This is the best I can do", "Screw you!",
      new Choice(5, 0, 0, -5),
      new Choice(-5, 0, 0, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Dad),
      dayTimes.noon,
      "Calls you while you're with friends", "Answer", "Ignore",
      new Choice(0, -5, 0, 0),
      new Choice(0, 0, 0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Dad),
      dayTimes.evening,
      "From now on you need to be at home at 7 p.m.", "Okay…", "It’s not going to happen",
      new Choice(10, 0, 0, 0),
      new Choice(-5, 0, 0, -10, undefined)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Dad),
      dayTimes.night,
      "Why aren’t you asleep?", "I’ll go to sleep now", "Leave me alone!",
      new Choice(0, 0, 0, 5),
      new Choice(-5, 0, 0, -5)
    ),

    //#endregion

    //#region Mom
    //Mom Events--
    new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.afternoon,
      "Do your chores", "Okay", "Later",
      new Choice(5, 0, 0, 5),
      new Choice(0, 0, 0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.afternoon,
      "Let’s go watch a movie!", "Okay!", "I can’t hang out with you",
      new Choice(0, -5, 0, 5),
      new Choice(5, 0, 0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.afternoon,
      "Who is that cute girl you’re hanging out with?", "Just a Friend", "Nobody",
      new Choice(5, 0, 0, -5, this.MomReactionEventMap.get("girlfriend")),
      new Choice(0, 0, 0, 0)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.morning,
      "I made you a sandvich", "Looks good!", "Okay",
      new Choice(0, 0, 0, 5),
      new Choice(0, 0, 0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Mom),
      dayTimes.afternoon,
      "Are you smoking?", "None of your business", "I’m not",
      new Choice(-5, 5, 0, -10),
      new Choice(0, 0, 0, 5)
    ),

  ]
  //#endregion

  OtherEvents = [

    new GameEvent(this.charactersData.getCharacter(Characters.Hagi),
      dayTimes.dream,
      "This is my domain", "Nice coding", "Leave me a loan",
      new Choice(5, 10, -10),
      new Choice(20, -15, 20, 0)
    ),
    new GameEvent(this.charactersData.getCharacter(Characters.Hagi),
      dayTimes.dream,
      "This is the second dream", "Nice dream", "Damn",
      new Choice(5, 10, -10),
      new Choice(20, -15, 20, 0)
    ),
    new GameEvent(this.charactersData.getCharacter(Characters.Dad),
      dayTimes.dream,
      "This is the second of dad", "Nice dream", "Damn",
      new Choice(5, 10, -10),
      new Choice(20, -15, 20, 0)
    ),

    new GameEvent(this.charactersData.getCharacter(Characters.Hagi),
      dayTimes.night,
      "I was made for testing", "Well you work!", "You don't work...",
      new Choice(5, 10, -10, undefined),
      new Choice(20, -15, 20, 0)
    ),
    new GameEvent(this.charactersData.getCharacter(Characters.Hagi),
      dayTimes.night,
      "I was made for 2", "Well you work!", "You don't work...",
      new Choice(5, 10, -10, undefined),
      new Choice(20, -15, 20, 0)
    ),
  ]

  SmokerEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.noon,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.morning,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.afternoon,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.night,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.dream,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.evening,
      "Smoke smoke smoke?!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),
  ]
  CurrentEvents = this.OtherEvents

  morningEvents = [];
  noonEvents = [];
  afternoonEvents = [];
  eveningEvents = [];
  nightEvents = [];
  dreamEvents = [];

  //#endregion

  //#region Lose Events

  loseEventsMap = new Map([
    ["STRESSFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.StressFull),
        dayTimes.reaction,
        "As you tried to cover all the fires that raged within your soul, you realised the only way to extinguish them all is by killing the carrying body",
        "what?",
        "I guess this is goodbye")],
    ["STRESSLESS",
      new GameEvent((this.charactersData.getCharacter(Characters.StressLess)),
        dayTimes.reaction,
        "Nothing seemed to weigh down your soul, the chores, tests. The pressure meant nothing, you have transcended passed that.",
        "",
        "")],
    ["SOCIALFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.SocialFull),
        dayTimes.reaction,
        "You surrounded yourself with friends and dedicated yourself to them, but for some reason it feels like your missing someone...",
        "It's me!",
        "Who?")],
    ["SOCIALLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.SocialLess),
        dayTimes.reaction,
        "They say man is a social animal, and as all animals they can't live without satisfying their hunger...",
        "I need friends",
        "What?")],
    ["PARENTSFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.ParentFull),
        dayTimes.reaction,
        "Your parents are very proud of you, and are always around you, but for some reason you feel you will always be a little kid",
        "",
        "")],
    ["PARENTSLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.ParentLess),
        dayTimes.reaction,
        "Your parents lost all intrest or trust in you, so they sent you away",
        "They can't do that!",
        "Wait!")],
    ["GRADESFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.GradeFull),
        dayTimes.reaction,
        "Top of your class and almost top of the school, your life revolve around the numbers on the test you are taking and the grades you are getting but it feels like no matter how high the grade you get it's never enough..",
        "",
        "")],
    ["GRADESLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.GradeEmpty),
        dayTimes.reaction,
        "You feel worthless 'how can I be this dumb? Why can't I achieve?', you ask yourself.. ",
        "",
        "")],
  ])

  //#endregion

  //#region Public Methods

  setUpGameEvents() {
    if (this.includeBully) {
      this.CurrentEvents = this.CurrentEvents.concat(this.BullyEvents);
    }

    if (this.includeNerd) {
      this.CurrentEvents = this.CurrentEvents.concat(this.NerdEvents);
    }

    if (this.includePopGirl) {
      this.CurrentEvents = this.CurrentEvents.concat(this.PopGirlEvents);
    }

    if (this.includeFreak) {
      this.CurrentEvents = this.CurrentEvents.concat(this.FreakEvents);
    }

    if (this.includeCounselor) {
      this.CurrentEvents = this.CurrentEvents.concat(this.CounselorEvents);
    }
    if (this.includeCounselor) {
      this.CurrentEvents = this.CurrentEvents.concat(this.ParentsEvents);
    }

    if (this.includeOther) {
      this.CurrentEvents = this.CurrentEvents.concat(this.OtherEvents);
    }

    if (this.includeTeacher) {
      this.CurrentEvents = this.CurrentEvents.concat(this.TeacherEvents);
    }

    if (this.includeSmoker) {
      this.CurrentEvents = this.CurrentEvents.concat(this.SmokerEvents)
    }

    if (this.includeDepressed) {
      //Push the depressed event array
    }

  }

  getLoseType() {
    return this.loseType;
  }

  pullNext() {
    // let item = this.CurrentEvents[Math.floor(Math.random() * this.CurrentEvents.length)];
    let item = this.CurrentEvents[Math.floor(Math.random() * this.CurrentEvents.length)];
    return item;
  }
  pullEvent() {
    let event = this.pullNext()
    if (!this.lastEvent) {
      this.lastEvent = null;
    }
    while (this.lastEvent === event || this.secondLastEvent === event || this.lastEvent.character === event.character || event === this.LastEventMap.get(event.character)) {
      event = this.pullNext()
    }
    this.LastEventMap.set(event.character, event)
    this.secondLastEvent = this.lastEvent
    this.lastEvent = event
    return event;
  }




  pullLoseEvent(bar: Bar, calculatedValue) {

    if (calculatedValue <= 0) {
      this.loseEvent = this.loseEventsMap.get(bar.type + "LESS")
      this.loseType = bar.type + "LESS"
    }

    if (calculatedValue >= 100) {
      this.loseEvent = this.loseEventsMap.get(bar.type + "FULL")
      this.loseType = bar.type + "FULL"
    }
    return this.loseEvent;
  }

  eventSorter() {
    this.CurrentEvents.forEach(event => {
      if (event.dayTime === dayTimes.morning) {
        this.morningEvents.push(event)
      }
      if (event.dayTime === dayTimes.noon) {
        this.noonEvents.push(event)
      }
      if (event.dayTime === dayTimes.afternoon) {
        this.afternoonEvents.push(event)
      }
      if (event.dayTime === dayTimes.evening) {
        this.eveningEvents.push(event)
      }
      if (event.dayTime === dayTimes.night) {
        this.nightEvents.push(event)
      }
      if (event.dayTime === dayTimes.dream) {
        this.dreamEvents.push(event)
      }
    });
  }

  pullNextFromArray(array) {
    let item = array[Math.floor(Math.random() * array.length)];
    return item;
  }

  pullMorningEvent() {
    return this.pullNextFromArray(this.morningEvents);
  }
  pullNoonEvent() {
    return this.pullNextFromArray(this.noonEvents);
  }
  pullAfternoonEvent() {
    return this.pullNextFromArray(this.afternoonEvents);
  }
  pullEveningEvent() {
    return this.pullNextFromArray(this.eveningEvents);
  }
  pullNightEvent() {
    return this.pullNextFromArray(this.nightEvents);
  }
  pullDreamEvent() {
    return this.pullNextFromArray(this.dreamEvents);
  }


  resetAllEvents() {
    this.CurrentEvents = []
    this.morningEvents = []
    this.noonEvents = []
    this.afternoonEvents = []
    this.eveningEvents = []
    this.nightEvents = []
    this.dreamEvents = []
  }

  includeChecker(gameState) {
    gameState.perks.forEach(perk => {
      this.perkIncluder(perk)
    });
  }

  perkIncluder(perk) {
    switch (perk) {
      case Perk.Smoker:
        this.includeSmoker = true;
        break;
      case Perk.Depressed:
        this.includeDepressed = true;
        break;
    }
  }

  updateEventPool(gameState: GameState) {
    this.resetAllEvents();
    this.resetAllPerks();
    this.includeChecker(gameState)
    this.setUpGameEvents();
    this.eventSorter();
  }

  resetAllPerks() {
    this.includeSmoker = false;
    this.includeDepressed = false;
  }

  //#endregion

}
