import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
   selector: 'app-losepage',
   templateUrl: './losepage.component.html',
   styleUrls: ['./losepage.component.css']
})
export class LosepageComponent implements OnInit {

   constructor(private eventService: EventsService) { }

   loseType;


   infoText;

   fadeInButton = false;

   showButton = false;


   infoMap = new Map<string, string>([
      ["STRESSFULL", `The main reasons for child suicide are school-related issues such as demanding school work or bullying.
 These problems lead children to depression.
 Kenzo Denda, a professor at Hokkaido University, reports that in Japan 1 in 12 primary school students and 1 in 4 secondary school students suffer from depression, which causes many of them to commit suicide(Source - Humanium)`],

      ["STRESSLESS", `We often think of stress, especially in kids, as a negative.
 Research helps us see that some stress is a normal part of development and it actually helps propel development forward`],

      ["SOCIALFULL", "Worrying too much about what others think might hinder a child's development"],

      ["SOCIALLESS", `A child who is lonely may feel that others are rejecting him.
 He may lose confidence in himself and eventually believe he has nothing valuable to offer.`],

      ["PARENTFULL", `More and more studies have confirmed that children of overprotective parents are risk-averse,
 have difficulty making decisions, and lack the wherewithal to become successful in life.`],

      ["PARENTSLESS", "Without a parental figuire who has experience in life, who do you have to learn from?"],

      ["GRADESFULL", `Most children who are labeled as geniuses, prodigies or exceptionally gifted end up leading very average lives.
 Most do not become great leaders, musicians, artists, scholars, giants of business or philosophers.`],

      ["GRADESLESS", `Underachievement is a symptom-a symptom with multiple causes.
 The first step is to diagnose the problem`],

   ])
   ngOnInit() {
      this.loseType = this.eventService.getLoseType();
      this.infoText = this.infoMap.get(this.loseType);
   }

   fadeUpEnd() {
      this.fadeInButton = true;
   }


   buttonEnd() {
      this.showButton = true;
   }

   refresh() {
      window.location.reload();
   }
}


