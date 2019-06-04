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
  includeCoach = true;
  includePrincipal = true;
  includeLela = true;
  includeShyGirl = true;
  includeEnviorment = true;

  includeSmoker = false;
  includeDepressed = false;
  includeGossiper = false;

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

  LelaReactionEventMap = new Map<String, GameEvent>([
    ["walkOut", new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.noon,
      "Oh are you sure dear?", "Yes", "I think I got confused",
      new Choice(0, -10, 5, 0),
      new Choice()
    )],
    ["juicyGossip", new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.afternoon,
      "Really!? I didn’t know she’s that kind of girl..", "Yeah I’m surprised as well.", "Make the story even more exaggerated",
      new Choice(0, -5, 5, 0),
      new Choice(0, -15, 10, 0, undefined, undefined, Perk.Gossiper)
    )],
    ["kissUp", new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.afternoon,
      "Oh stop it you!", "Keep kissing up to her", "Stay silent",
      new Choice(0, -10, 5, 0),
      new Choice()
    )],
  ])

  BullyReactionEventMap = new Map<String, GameEvent>([
    ["pushBack", new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "Where did you get the balls to push me?", "I'm only starting", "You can't push me for no reason!",
      new Choice(10, 15, 0, -5),
      new Choice(5, -5, 0, 10)
    )],
  ])

  ShyGirlReactionEventMap = new Map<String, GameEvent>([
    ["look", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.morning,
      "She quickly looks away", "", "",
      new Choice(),
      new Choice()
    )],
    ["notBad", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "Not that bad? I need at least an average of 95 if I want to get into a good college!", "What will you get from a good college?", "Wow, that’s alot.",
      new Choice(0, -5, 0, 0, () => this.ShyGirlReactionEventMap.get("notBad2")),
      new Choice(0, 5)
    )],
    ["notBad2", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "Are you seriously asking that?", "Yeah, I really want to know.", "Forget it",
      new Choice(0, 0, 0, 0, () => this.ShyGirlReactionEventMap.get("notBad3")),
      new Choice(0)
    )],
    ["notBad3", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "Well, a good college means a good job for the future", "So if you don’t get 95 in all of your tests you basically die", "Oh.",
      new Choice(0, -10, 0, 0, () => this.ShyGirlReactionEventMap.get("notBad4")),
      new Choice(0)
    )],
    ["notBad4", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "You just don’t get it. It’s not like that.", "It sounds like your worrying too much about this", "Well it’s your life.",
      new Choice(0, 0, 0, 0, () => this.ShyGirlReactionEventMap.get("notBad5")),
      new Choice(0)
    )],
    ["notBad5", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "*sighs* Maybe I am..", "It’s alright, achieving is good, just don’t overdo it.", "If I were you I would just try to enjoy the moment, we won’t be young forever",
      new Choice(0, 10),
      new Choice(0, -5, 0, 0, () => this.ShyGirlReactionEventMap.get('notBad6'))
    )],
    ["notBad6", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "No! I need to study!", "Okay", "Alright..",
      new Choice(),
      new Choice()
    )],
    ["jessyHangout", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.afternoon,
      "I can’t hang out today.. I got a lot of homework", "Come on, just abit!", "Alright..",
      new Choice(0, 5, 0, 0, () => this.ShyGirlReactionEventMap.get("jessyHangout2")),
      new Choice()
    )],
    ["jessyHangout2", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.afternoon,
      "No no… I can’t", "You gotta spice things up abit, the homework can wait", "Okay.",
      new Choice(0, 0, 0, 0, () => this.ShyGirlReactionEventMap.get("jessyHangout3")),
      new Choice()
    )],
    ["jessyHangout3", new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.afternoon,
      "Alright, I guess I can stay for abit", "Oh yeah!", "On a second thought, forget it.",
      new Choice(0, 5),
      new Choice(0, -10)
    )],
  ])

  PrincipalReactionMap = new Map<String, GameEvent>([
    ["confront", new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.afternoon,
      "I did not say such things! You better watch your mouth!", "I’m sorry!", "Don’t try lying! I heard you!",
      new Choice(0, 0, -5),
      new Choice(0, 0, -10, 0, () => this.PrincipalReactionMap.get('confront2'))),],
    ["confront2",
      new GameEvent(
        this.charactersData.getCharacter(Characters.Principal),
        dayTimes.afternoon,
        "You’re just another petty student, you don’t know what you heard.", "Forget it…", "A petty student? You’re a perverted piece of shit!",
        new Choice(0),
        new Choice(0, 0, -10, 0, () => this.PrincipalReactionMap.get('confront3'))),],
    ["confront3",
      new GameEvent(
        this.charactersData.getCharacter(Characters.Principal),
        dayTimes.afternoon,
        "Watch it, or I’ll make your life within this school a living hell.", "Walk away", "People are going to hear about this.",
        new Choice(0),
        new Choice(5, 0, -5, 0, () => this.PrincipalReactionMap.get('confront4'))),],
    ["confront4",
      new GameEvent(
        this.charactersData.getCharacter(Characters.Principal),
        dayTimes.afternoon,
        "Oh! You’re threatening me? Even though none will believe you?", "Walk away", "I’m not going to go down alone.",
        new Choice(0),
        new Choice(0, 0, -10, 0, () => this.PrincipalReactionMap.get('confront5'))),],
    ["confront5",
      new GameEvent(
        this.charactersData.getCharacter(Characters.Principal),
        dayTimes.afternoon,
        "I’m giving you a last chance, walk away and I’ll forget about this.", "Walk away", "I recorded you with my phone (bluff)",
        new Choice(0),
        new Choice(10, 0, -5, 0, () => this.PrincipalReactionMap.get('confront6'))),],
    ["confront6",
      new GameEvent(
        this.charactersData.getCharacter(Characters.Principal),
        dayTimes.afternoon,
        "You’re right, I’m sorry, I shouldn’t talk like that", "Good boy..", "We’re not done, raise my grades, or else.",
        new Choice(0, 20),
        new Choice(0, 0, 40, 0))
    ]
  ]);

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

  LelaEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.morning,
      "Good morning students!", "You look lovely today!", "Good morning.",
      new Choice(0, -5, 5),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.noon,
      "You see Ms.Lela heading out of the school when she should be teaching", "Tell her about the class", "Ignore",
      new Choice(0, 0, 0, 0, () => this.LelaReactionEventMap.get("walkOut")),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.afternoon,
      "Do you know if Stacy has a boyfriend?", "Fabricate a juicy story to please her", "I don’t know",
      new Choice(0, -5, 5, 0, () => this.LelaReactionEventMap.get("juicyGossip")),
      new Choice(0, 0, -5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.noon,
      "Why aren’t you paying attention?", "I’m sorry ma’am", "I can’t focus with such a hot teacher",
      new Choice(0, 0, -5),
      new Choice(0, 0, 10, 0, () => this.LelaReactionEventMap.get("kissUp"))
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Lela),
      dayTimes.morning,
      "You see Ms.Lela walking up the stairs", "Offer to carry her bag", "Keep walking",
      new Choice(0, -5, 5),
      new Choice()
    ),

  ]

  PrincipalEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.morning,
      "Don’t test me punk", "Stay silent", "Go check the teacher’s lounge, I left a nice ‘test’ there.",
      new Choice(0, -10),
      new Choice(0, 15, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.noon,
      "You kids aren’t getting good grades! Try harder!", "He’s right!", "Try harder at being a principal!",
      new Choice(0, -10, 10),
      new Choice(0, 5, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.noon,
      "If you’ll act nicely next to the inspector I’ll raise your average", "You got a deal!", "I’d rather spit on him",
      new Choice(0, 0, 10),
      new Choice(0, 10, 10, -10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.morning,
      "I got a report that you broke the table in your class", "Take the blame", "That’s fucking bullshit!",
      new Choice(5, 0, -5, -10),
      new Choice(10, 0, -10, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Principal),
      dayTimes.afternoon,
      "You hear the principal saying inappropriate things about Stacy’s body", "Ignore it", "Confront him",
      new Choice(),
      new Choice(0, 0, 0, 0, () => this.PrincipalReactionMap.get("confront"))
    ),
  ]

  CoachEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Coach),
      dayTimes.noon,
      "We’re doing a 2km run today", "Alright Coach", "I can’t run I don’t feel so good!",
      new Choice(0, 0, +5),
      new Choice(0, -5, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Coach),
      dayTimes.noon,
      "Where’s the rest of the class?", "I’ll call them", "I don’t know",
      new Choice(0, -10, +10),
      new Choice(0, 0, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Coach),
      dayTimes.afternoon,
      "Can you fill the attendance for me?", "Fill it honestly", "Lie to cover up others",
      new Choice(),
      new Choice(0, 10)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.Coach),
      dayTimes.noon,
      "Is it true that our class is canceled for today?", "Not that I heard", "Yeah I heard it from the principal (lie)",
      new Choice(),
      new Choice(0, 10, -10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Coach),
      dayTimes.noon,
      "That weird fat kid is getting on my nerves..", "I heard he dosen’t really have asthma", "Ignore the remark",
      new Choice(0, 10, -5, -5),
      new Choice(0, 10, -10)
    ),
  ]

  ShyGirlEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.morning,
      "You see Jessy looking at you with a smile", "Look at her and smile back", "Break eye contact",
      new Choice(0, 0, 0, 0, () => this.ShyGirlReactionEventMap.get("look")),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.ShyGirl),
      dayTimes.noon,
      "I can’t believe I only got 85 on this test!", "You’ll do better next time", "85 is not that bad",
      new Choice(0, 5),
      new Choice(0, -5, 0, 0, () => this.ShyGirlReactionEventMap.get("notBad"))
    ),

  ]

  EnvoirmentEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.AfternoonView),
      dayTimes.afternoon,
      "School has ended", "Head home", "Find someone to hang out with",
      new Choice(0),
      new Choice(0, 0, 0, 0, () => this.ShyGirlReactionEventMap.get("jessyHangout"))
    ),
  ]

  BullyEvents = [

    new GameEvent(
      this.charactersData.getCharacter(Characters.Bully),
      dayTimes.noon,
      "Pushes you violently", "Push him back", "Ignore him",
      new Choice(15, 0, 0, 0, () => this.BullyReactionEventMap.get("pushBack"), new Map<Perk, choiceWithText>([
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
      new Choice(-5, 5, -5, 0, undefined, undefined),
      new Choice(10)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "Why can't I get a gamer girlfriend?", "Stop acting weird", "I believe in you!",
      new Choice(0, 5, 0, 0, undefined, undefined),
      new Choice(0, -10, 0, 0)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.afternoon,
      "Do you want to hang out? I'll help you with your project", "Sure thing!", "I'm busy",
      new Choice(-5, -10, 0, +10, undefined, undefined),
      new Choice()
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Nerd),
      dayTimes.noon,
      "I'm gonna tell the teacher you cheated on the test!", "Slap him", "But I didn't cheat!",
      new Choice(0, 10, 0, -10, undefined, undefined),
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
      new Choice(-10, 15, 0, 0),
      new Choice(0, -15)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.morning,
      "You wear this to school?", "What's wrong with it?", "I'll do better",
      new Choice(5, -10, 0, 0),
      new Choice(5, 5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.noon,
      "Courtney is such a slut", "I know right?", "She's alright",
      new Choice(-5, 10, 0, 0, undefined, undefined, Perk.Gossiper),
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
      new Choice(0, 15, 0, 0),
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
      new Choice(5, 0, 0, -5, () => this.MomReactionEventMap.get("girlfriend")),
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
  GossiperEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.PopGirl),
      dayTimes.noon,
      "I heard that the principle is into teenage girls", "Spread the rumor", "Keep it to yourself",
      new Choice(0, 10, -15, 0, undefined, undefined, Perk.Gossiper),
      new Choice(0, -5)
    ),

    new GameEvent(
      this.charactersData.getCharacter(Characters.Freak),
      dayTimes.morning,
      "Stacy spread a rumor about you that you harrased her", "That's a lie!", "I turned Stacy down, that's the truth.",
      new Choice(0, -10),
      new Choice(0, 10, 0, 0, undefined, undefined, Perk.Gossiper)
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

  MorningTransitionEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.MorningView),
      dayTimes.morning,
      "The sun is rising once again", "Sleep a little more", "Get up",
      new Choice(-5, 0, 0, -5),
      new Choice(5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.MorningView),
      dayTimes.morning,
      "Another day begins", "Another day another grade", "I want to sleep..",
      new Choice(-5, 0, 0),
      new Choice(5)
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.MorningView2),
      dayTimes.morning,
      "Light shines on your face, waking you up", "Close the window", "Get up",
      new Choice(-5, 0, 0, -5),
      new Choice(5)
    ),
  ]
  AfternoonTransitionEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.AfternoonView),
      dayTimes.afternoon,
      "The day has come to an end, the sun is over your head", "Enjoy the moment", "Keep going",
      new Choice(-5),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.AfternoonView2),
      dayTimes.afternoon,
      "The sun's going down", "It's about time", "Keep going",
      new Choice(-5),
      new Choice()
    ),
  ]
  EveningTransitionEvents = [
    new GameEvent(
      this.charactersData.getCharacter(Characters.EveningView),
      dayTimes.evening,
      "Stars begin to shine in the night sky", "Prepare yourself for the next day", "Enjoy the evening",
      new Choice(10, 0, 5),
      new Choice()
    ),
    new GameEvent(
      this.charactersData.getCharacter(Characters.EveningView2),
      dayTimes.evening,
      "The night falls on the city", "Prepare yourself for the next day", "Enjoy the evening",
      new Choice(10, 0, 5),
      new Choice()
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
    if (this.includeCoach) {
      this.CurrentEvents = this.CurrentEvents.concat(this.CoachEvents);
    }
    if (this.includePrincipal) {
      this.CurrentEvents = this.CurrentEvents.concat(this.PrincipalEvents);
    }
    if (this.includeLela) {
      this.CurrentEvents = this.CurrentEvents.concat(this.LelaEvents);
    }
    if (this.includeShyGirl) {
      this.CurrentEvents = this.CurrentEvents.concat(this.ShyGirlEvents);
    }
    if (this.includeEnviorment) {
      this.CurrentEvents = this.CurrentEvents.concat(this.EnvoirmentEvents);
    }


    if (this.includeSmoker) {
      this.CurrentEvents = this.CurrentEvents.concat(this.SmokerEvents)
    }

    if (this.includeDepressed) {
      //Push the depressed event array
    }
    if (this.includeGossiper) {
      //Push the gossiper event array
    }

  }

  getLoseType() {
    return this.loseType;
  }

  pullNext() {
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

  getTransitionEvent(event: GameEvent): GameEvent {
    let transEvent
    switch (event.dayTime) {
      case dayTimes.morning:
        transEvent = this.pullNextFromArray(this.MorningTransitionEvents);
        break;

      case dayTimes.afternoon:
        transEvent = this.pullNextFromArray(this.AfternoonTransitionEvents);
        break;

      case dayTimes.evening:
        transEvent = this.pullNextFromArray(this.EveningTransitionEvents);
        break;
    }
    return transEvent

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

      case Perk.Gossiper:
        this.includeGossiper = true;
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
    this.includeGossiper = false;
  }

  //#endregion

}
