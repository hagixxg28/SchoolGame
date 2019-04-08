import { Injectable, OnInit } from '@angular/core';
import { GameEvent } from '../models/gameEvent';
import { Characters } from '../enums/Characters';
import { Choice } from '../models/choice';
import { Addiction } from '../models/addiction';
import { CharacterDataService } from '../Data/character-data.service';
import { Bar } from '../models/bar';

@Injectable({
  providedIn: 'root'
})
export class EventsService {


  constructor(private charactersData: CharacterDataService) { }

  //Event Booleans:
  includeBully = true;
  includeNerd = true;
  includePopGirl = true;
  includeOther = false;
  includeFreak = true;
  includeCounselor = true;


  //Event Pool variables:
  secondLastEvent: GameEvent;
  //Setting it to a void event so my function will work ( I don't want to pull the same character event after event)
  lastEvent = new GameEvent(this.charactersData.getCharacter(Characters.Void), "", "", "");
  loseEvent: GameEvent;


  //Event Map

  LastEventMap = new Map([])

  Events = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Hagi),
      "I see you..", "Stop", "Good for you?",
      new Choice(10, 10, -10, -10),
      new Choice(15, 0, -20, 5)),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bobby),
      "I'm Bobby", "Okay", "Good for you?",
      new Choice(10, 10, -10, -10),
      new Choice(15, 0, -20, 5)),

    new GameEvent(this.charactersData.getCharacter(Characters.Elad),
      "Ani mashkiaa be... Menayot?", "Money good", "Lmao"),

    new GameEvent(this.charactersData.getCharacter(Characters.Shlomi),
      "Shalom Korim li Shlomi", "Teleh Mipo", "Okay"),


    new GameEvent(this.charactersData.getCharacter(Characters.Jojo),
      "I speakin Japnease", "I don't", "NANI?",
      new Choice(-10, -10, -30, +40, new Addiction('Ciggaretes', 13)),
      new Choice(+10, 10, 10, 10, new Addiction('Ciggaretes', 13))),

    new GameEvent(this.charactersData.getCharacter(Characters.McRide),
      "You come out your shit is gone", "Bitch Please...", "BITCH",
      new Choice(0, 10, 30, -40),
      new Choice(+20, 10, 20, 10)),
  ]



  BullyEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "Pushes you violently", "Push him back", "Ignore him",
      new Choice(15),
      new Choice(5, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "What are you looking at?", "Why do you care?", "Nothing..",
      new Choice(10),
      new Choice(5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "Can I copy your homework?", "Why would I help you?", "Let him copy",
      new Choice(-10, -5),
      new Choice(0, 10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "You're such a looser I'm going to kick your ass after school!", "Throw a chair at him", "What did I do to you!?",
      new Choice(-20, 15, -10, -25),
      new Choice(10, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "You're such a loser I'm going to kick your ass after school!", "Throw a chair at him", "What did I do to you!?",
      new Choice(-20, 15, -10, -25),
      new Choice(10, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      "You see the bully sitting by himself crying", "Try to cheer him up", "Let him cry by himself  ",
      new Choice(-5, 5),
      new Choice(-10)
    ),
  ]

  NerdEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      "I just scored the top grade in the class", "You're still a loser", "Good for you.",
      new Choice(-5, 5, -5),
      new Choice(10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      "Why can't I get a gamer girlfriend?", "Stop acting weird", "I believe in you!",
      new Choice(0, 5, 0, 0),
      new Choice(0, -10, 0, 0)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      "Do you want to hang out? I'll help you with your project", "Sure thing!", "I'm busy",
      new Choice(-5, -10, 0, +10),
      new Choice()
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      "I'm gonna tell the teacher you cheated on the test!", "Slap him", "But I didn't cheat!",
      new Choice(0, 10, 0, -10),
      new Choice(0, 0, -10, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      "You see Miles getting bullied", "Help him against the bully", "Let him handle it by himself",
      new Choice(10, -10),
      new Choice()
    ),
  ]

  PopGirlEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "You're cute!", "Flirt with her", "No thanks.",
      new Choice(-10, 15),
      new Choice(0, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "You wear this to school?", "What's wrong with it?", "I'll do better",
      new Choice(5, -10),
      new Choice(5, 5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "Courtney is such a slut", "I know right?", "She's alright",
      new Choice(-5, 10),
      new Choice(10, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "Can you like my latest post?", "Sure thing!", "No way.",
      new Choice(0, 10),
      new Choice(0, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "I got this new Gucci scarf", "It looks great!", "What a waste of money!",
      new Choice(0, 15),
      new Choice(-5, -20)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      "Let's throw a party at your house!", "Let's do it!", "My parents will be mad",
      new Choice(10, 30, 0, -20),
      new Choice(15, -20, 0, 10)
    ),

  ]

  FreakEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      "I listen to real music!", "Okay?", "You sound cool!",
      new Choice(),
      new Choice(0, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      "Let's get pierced!", "Alright", "No thanks.",
      new Choice(5, 10, 0, -10),
      new Choice(5, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      "Let's ditch this class!", "I'm in", "I gotta study",
      new Choice(-10, 10, 0, -10),
      new Choice(10, -5, 10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      "Can you hide my ciggaretes at your place?", "Yeah", "No way",
      new Choice(10, 5, 0, -10),
      new Choice(0, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      "Throw a rock into the teacher's lounge!", "Throw a rock", "You do it",
      new Choice(20, 30, -10, -25),
      new Choice(5, -10)
    ),
  ]

  CounselorEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      "Are you alright?", "Yeah", "I need to talk abit",
      new Choice(),
      new Choice(-5, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      "You see the counselor's door is open and no one is around", "Get in", "Keep walking",
      new Choice(-10),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      "Therapy is very important, do you get it?", "Stay Silent", "Therapy is for losers!",
      new Choice(),
      new Choice(10, 10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Counselor),
      "Is there a bully in our school?", "Tell him", "Not that I know of",
      new Choice(5, -20, 0, 10),
      new Choice(10)
    ),
  ]

  StonerEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Stoner),
      "Wanna smoke something?", "Sure", "No thanks",
      new Choice(5, 10, 0, -5),
      new Choice(0, -10, 0, 5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Stoner),
      "Wanna go to a 'special' party?", "Ye", "Na",
      new Choice(-5, 20, 0, -10),
      new Choice(15, -50)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Stoner),
      "Wanna go to a 'special' party?", "Ye", "Na",
      new Choice(-5, 20, 0, -10),
      new Choice(15, -50)
    ),

  ]



  OtherEvents = [

    new GameEvent(this.charactersData.getCharacter(Characters.Hagi),
      "This is my domain", "Nice coding", "Leave me a loan",
      new Choice(5, 10, -10),
      new Choice(20, -15, 20, 0)
    )
  ]

  CurrentEvents = this.OtherEvents






  loseEventsMap = new Map([
    ["STRESSFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.StressFull),
        "As you tried to cover all the fires that raged within your soul, you realised the only way to extinguish them all is by killing the carrying body",
        "what?",
        "I guess this is goodbye")],
    ["STRESSLESS",
      new GameEvent((this.charactersData.getCharacter(Characters.StressLess)),
        "Nothing seemed to weigh down your soul, the chores the test the pressure meant nothing, you have transcended passed that.",
        "",
        "")],
    ["SOCIALFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.SocialFull),
        "You surrounded yourself with friends and dedicated yourself to them, but for some reason it feels like your missing someone...",
        "It's me!",
        "Who?")],
    ["SOCIALLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.SocialLess),
        "They say man is a social animal, and as all animals they can't live without satisfying their hunger...",
        "I need friends",
        "What?")],
    ["PARENTSFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.ParentFull),
        "Your parents are very proud of you, and are always around you, but for some reason you feel you will always be a little kid",
        "",
        "")],
    ["PARENTSLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.ParentLess),
        "Your parents lost all intrest or trust in you, so they sent you away",
        "They can't do that!",
        "Wait!")],
    ["GRADESFULL",
      new GameEvent(this.charactersData.getCharacter(Characters.GradeFull),
        "Top of your class and almost top of the school, your life revolve around the numbers on the test you are taking and the grades you are getting but it feels like no matter how high the grade you get it's never enough..",
        "",
        "")],
    ["GRADESLESS",
      new GameEvent(this.charactersData.getCharacter(Characters.GradeEmpty),
        "You feel worthless 'how can I be this dumb? Why can't I achieve?', you ask yourself.. ",
        "",
        "")],
  ])


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

    if (this.includeOther) {
      this.CurrentEvents = this.CurrentEvents.concat(this.OtherEvents);
    }


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
    console.log(bar.type + " is empty")
    this.loseEvent = this.loseEventsMap.get(bar.type + "LESS")
  }

  if (calculatedValue >= 100) {
    console.log(bar.type + " is full")
    this.loseEvent = this.loseEventsMap.get(bar.type + "FULL")
  }
  return this.loseEvent;
}



}
